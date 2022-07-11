
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
        
        });
    function renderElement(element){
        const p = document.createElement('p')
        p.textContent = element
    }