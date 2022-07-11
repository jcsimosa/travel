
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
        // console.log(usInfo)
        document.getElementById('form').addEventListener('submit',(e)=> {
            e.preventDefault()
            const cityData = e.target.city.value
            const stateData = e.target.state.value
            
            const filteredState = usInfo.filter(state => state.state_code === stateData)
            const filteredCity = filteredState.filter(city => city.city_name === cityData)
            console.log(filteredCity[0])

            const divResult = document.querySelector('div')
            const ulResult = document.createElement('ul')
            const liResult = document.createElement('li')

            ulResult.innerText = filteredState[0].state_code
            liResult.innerText = filteredCity[0].city_name
            divResult.append(ulResult)
            ulResult.append(liResult)
        })
    
    })

