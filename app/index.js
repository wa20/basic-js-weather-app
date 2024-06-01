

const APIKEY = "5852465c3a5a6930a12f2ddde19ed235";
let searchHistoryArray = [];



async function getWeather(e) {
    e.preventDefault()
   
    const city = document.getElementById("searchCity").value; 
    console.log(city);
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    let data = await response.json();



    currentForecast(data);
    // return data;

    return false
}


async function currentForecast(data) { 

 console.log('data:', data);

}
