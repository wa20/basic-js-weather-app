
// require('dotenv').config();

const APIKEY = "";

let searchHistoryArray = [];

console.log('searchHistoryArray:', searchHistoryArray);



async function getWeather(e) {
    e.preventDefault()
   
    const city = document.getElementById("searchCity").value; 

    console.log(city);

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
        let data = await response.json();
        currentForecast(data);

        const updatedList = searchHistoryArray.push(data.name);
        searchHistory(updatedList)
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
    

    return false
}


async function currentForecast(data) { 

 console.log('data:', data);

}


async function searchHistory(citySearched) { 
    console.log('citySearched:', citySearched);

    // Get the search history container
    const history = document.getElementById('searchHistory');

    // history.innerHTML = '';
    
    // citySearched.map((city) => {
    //     // Create a new list item
    //     const listItem = document.createElement('li');
    //     listItem.className = 'bg-white w-full p-5 text-center rounded-lg cursor-pointer hover:shadow-md active:scale-95';
    //     listItem.textContent = city;

    //     // Append the new list item to the search history container
    //     history.appendChild(listItem);
    // })
    
};



// document.getElementById('search-form').onsubmit = getWeather();