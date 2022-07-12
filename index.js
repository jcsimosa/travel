
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
            const cityData = e.target.city.value
            const stateData = e.target.state.value
            
            const filteredState = usInfo.filter(state => state.state_code === stateData)
            const filteredCity = filteredState.filter(city => city.city_name === cityData)

            const divResult = document.querySelector('div')
            const h2Result = document.createElement('h2')
            h2Result.style.fontSize = '25px'
            h2Result.style['font-weight'] = 'bold'

            h2Result.innerText = `${filteredCity[0].city_name} ${filteredState[0].state_code}`
            divResult.append(h2Result)


            priceInfo(cityData, stateData)


            function priceInfo(cityValue, stateValue) {
                fetch(`https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${cityValue}&country_name=United%20States`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com',
                    }
            }).then(data => data.json())
              .then(cityPriceInfo => {
                if (cityPriceInfo.state_code = stateValue){
                    // console.log(cityPriceInfo.prices)
                    const liItem = document.createElement('li')
                    const oneBedroomRent = cityPriceInfo.prices[20]
                    liItem.textContent = oneBedroomRent.item_name
                    liItem.style.fontSize = 15
                    // liItem.style.lineHeight = ''

                    const ulResult = document.createElement('ul')
                    ulResult.textContent =`${oneBedroomRent.category_name}: min $${oneBedroomRent.min}`
                    ulResult.style['font-weight'] = 'normal'

                    h2Result.append(liItem)
                    liItem.append(ulResult)
            
                } else {console.log('can\'t find the city')}
              })
            }
            
            
        })
    
    })

