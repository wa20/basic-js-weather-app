
// require('dotenv').config();

const APIKEY = "";

let searchHistoryArray = [];



async function getWeather(e) {
    e.preventDefault()
   
    const city = document.getElementById("searchCity").value; 
    console.log(city);

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
        let data = await response.json();
        currentForecast(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    

    return false
}


async function currentForecast(data) { 

 console.log('data:', data);

}



// document.getElementById('search-form').onsubmit = getWeather();