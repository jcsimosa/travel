fetch('https://cost-of-living-and-prices.p.rapidapi.com/cities', {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
        }
})
    .then(data => data.json())
    .then(travelData => {
        const cityArray = travelData.cities
        usInfo = cityArray.filter(countryObj => countryObj.country_name === 'United States')
        document.getElementById('form').addEventListener('submit',(e)=> {
            e.preventDefault()
            const divResult = document.querySelector('div#searched_info')
            function removingChildren(parent) {
              while(parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild)
              }
            }
            removingChildren(divResult)

            const cityData = e.target.city.value
            const stateData = e.target.state.value

            
            const filteredState = usInfo.filter(state => state.state_code === stateData)
            const filteredCity = filteredState.filter(city => city.city_name === cityData)

            const favoriteBtn = document.createElement('button')        
            favoriteBtn.textContent =  '⭐️' 
            favoriteBtn.className = 'favoriteBtn'
            favoriteBtn.addEventListener('click', (e)=> {
              alert('added to favorites')
            })

            const tableContainer = document.createElement('TABLE')
            tableContainer.className = 'info'
            const tableRowHeader = document.createElement('tr')
            const tableRowPrices = document.createElement('tr')
            tableContainer.append(tableRowHeader,tableRowPrices)

            const h2Result = document.createElement('h2')
            h2Result.style.fontSize = '25px'
            h2Result.style['font-weight'] = 'bold'
            h2Result.className = 'title_text'

            h2Result.innerText = `${filteredCity[0].city_name}, ${filteredState[0].state_code} `
            // divResult.innerHTML = ""
            divResult.append(h2Result,tableContainer)
            h2Result.appendChild(favoriteBtn)

            priceInfo(cityData, stateData)

            const map = new google.maps.Map(document.getElementById('map-canvas'),{
              center:{
                  lat:39.828175,
                  lng:-98.5795 
              },
              zoom:4
            });

            new google.maps.Marker({
              position:{
                  lat: filteredCity[0].lat,
                  lng: filteredCity[0].lng 
              },
              map:map,
              draggable: true
            })

            // update
            window.onload = function () {
              var commentform = document.forms['commentForm']
              var commentObj = new CommentClass();
              commentObj.addInputBoxEventListener(document.getElementById('main-comment'), 'comments');

            }

                function CommentClass () {
                  var _self = this;
                  this.addInputBoxEventListener = function (elem, target, hideClass) {
                    elem.addEventListener('keypress', function (evt) {
                      evt = evt || window.event;
                      if (evt.keyCode === 13) {
                        _self.addComment(evt.target.value, target)
                        evt.target.value = '';
                        if (hideClass) {
                          this.className = hideClass
                        }
                      }
                      evt.stopPropagation();
                      return false;
                    }, false)
                  }
                
                  this.addComment = function (comment, target) {
                    createCommentStructure(target, 'Practice User', comment, 0, new Date().getTime())
                  }
                
                  var createCommentStructure = function (target, header, content, upvote, date) {
                    var outerDiv = document.createElement('div');
                    outerDiv.className = 'comment-section';
                    var imgSpan = document.createElement('span');
                    imgSpan.className = 'user-icon';
                    var commentDetails = document.createElement('div');
                    commentDetails.className = 'comment-details';
                
                    var commentHeader = document.createElement('div');
                    commentHeader.className = 'comment-header';
                    commentHeader.innerText = header;
                
                    var commentBody = document.createElement('div');
                    commentBody.className = 'comment-body';
                    commentBody.innerText = content;
                
                    var commentFeature = document.createElement('div');
                    commentFeature.className = 'comment-feature';
                
                    var upvoteCount = document.createElement('span');
                    upvoteCount.innerText = '0';
                    var upvoteBtn = document.createElement('button');
                    upvoteBtn.innerText = 'Upvote';
                    upvoteBtn.className = 'upvote-btn'
                
                    var downVoteBtn = document.createElement('button');
                    downVoteBtn.innerText = 'Downvote';
                    downVoteBtn.className = 'downvote-btn';
                
                    upvoteBtn.addEventListener('click', function () {
                      var upvote = parseInt(commentFeature.getAttribute('data-vote') || 0);
                      commentFeature.setAttribute('data-vote', ++upvote);
                      upvoteCount.innerText = upvote;
                    }, false);
                
                    downVoteBtn.addEventListener('click', function () {
                      var upvote = parseInt(commentFeature.getAttribute('data-vote') || 0);
                      commentFeature.setAttribute('data-vote', upvote === 0 ? 0 : --upvote);
                      upvoteCount.innerText = upvote;
                    }, false);
                
                    var replyBtn = document.createElement('a');
                    replyBtn.href = '#';
                    replyBtn.className = 'reply-btn';
                    replyBtn.innerText = 'Reply';
                
                    var inputElement = document.createElement('input');
                    inputElement.placeholder = 'Add comment';
                    inputElement.className = 'comment-box reply-comment hide';
                    inputElement.setAttribute('autocomplete', 'off');
                
                    commentFeature.appendChild(upvoteCount);
                    commentFeature.appendChild(upvoteBtn);
                    commentFeature.appendChild(document.createTextNode(' | '));
                    commentFeature.appendChild(downVoteBtn);
                    commentFeature.appendChild(replyBtn);
                    commentFeature.appendChild(inputElement);
                
                    replyBtn.addEventListener('click', function (e) {
                      var regex = /show/g;
                      if (regex.test(inputElement.className)) {
                        inputElement.className = 'comment-box reply-comment hide';
                      } else {
                        inputElement.className = 'comment-box reply-comment show';
                        inputElement.focus()
                      }
                    }, false);
                
                    var newComment = document.createElement('div');
                    newComment.className = 'new-comment';
                
                    commentDetails.appendChild(commentHeader);
                    commentDetails.appendChild(commentBody);
                    commentDetails.appendChild(commentFeature);
                    commentDetails.appendChild(newComment);
                
                    outerDiv.appendChild(imgSpan);
                    outerDiv.appendChild(commentDetails);
                
                    _self.addInputBoxEventListener(inputElement, newComment, 'comment-box reply-comment hide')
                
                    if (typeof target === 'string') {
                      document.getElementById(target).appendChild(outerDiv);
                    } else {
                      target.appendChild(outerDiv)
                    }
                  }
                
                }

            function priceInfo(cityValue, stateValue) {
                fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityValue}&country_name=United%20States`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
                    }
            }).then(data => data.json())
              .then(cityPriceInfo => {
                if (cityPriceInfo.state_code === stateValue){
                    const newArrayRent = cityPriceInfo.prices.filter(categoryOBj => categoryOBj.category_name === 'Rent Per Month')
                    const newArrayApartment =    cityPriceInfo.prices.filter(categoryOBj => categoryOBj.category_name === 'Buy Apartment')
                   
                    newArrayApartment.forEach(obj => {
                        renderInfo(obj)
                    });
                    
                    newArrayRent.forEach(obj => {
                        renderInfo(obj)
                    })
            
                function renderInfo (item) {   
                            const itemName = document.createElement('th')
                            const price = document.createElement('td')
                            itemName.textContent = item.item_name
                            price.textContent = item.usd.avg
                    
                            tableRowHeader.append(itemName)
                            tableRowPrices.append(price)
                }
                
                    }
              })
            }
            
            
        })
    
    })
