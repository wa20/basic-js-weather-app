// require('dotenv').config();

const APIKEY = "";

let searchHistoryArray = [];

console.log("searchHistoryArray:", searchHistoryArray);

async function getWeather(city) {
  if (typeof city === "object") {
    city.preventDefault();
    city = document.getElementById("searchCity").value.trim();
  } else {
    document.getElementById("searchCity").value = city;
  }

  if (!city) {
    console.log("City name cannot be empty.");
    return false;
  }

  console.log(city);

  if (!city) {
    console.log("City name cannot be empty.");
    return false;
  }

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    let data = await response.json();
    currentForecast(data);

    // Check if the city is already in the search history
    if (!searchHistoryArray.includes(data.name)) {
      searchHistoryArray.push(data.name);
      searchHistory(searchHistoryArray);
    } else {
      console.log("City is already in the search history.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }

  return false;
}

async function currentForecast(data) {
  console.log("data:", data);

  const mainCard = document.getElementById("mainCardLeft");
  

  const today = moment().format("ddd MMM Do");

  const cityName = data.name;
  const tempRaw = data.main.temp;
  const celsius = (tempRaw - 32) * 5/9;

  const feelsLike = data.main.feels_like;
  const tempMax = data.main.temp_max;
  const humidity = data.main.humidity;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  //   icon
  const icon = data.weather[0].icon;
  const description = data.weather[0].main;

  mainCard.innerHTML = "";

  //divs for main card
  const mainCardRight = document.createElement("div");
  const mainCardLeft = document.createElement("div");




  //Current weather details
  const cityNameItem = document.createElement("p");
  const celsiusItem = document.createElement("p");
  const feelsLikeItem = document.createElement("p");
  const tempMaxItem = document.createElement("p");
  const humidityItem = document.createElement("p");
  const sunriseItem = document.createElement("p");
  const sunsetItem = document.createElement("p");

 //current weather icon and description
 const iconItem = document.createElement("img");
 const descriptionItem = document.createElement("p");


 //append items to main card
  cityNameItem.className = "text-6xl text-white font-semibold";
  cityNameItem.textContent = `${cityName} | ${today}`;

  celsiusItem.className = "text-4xl text-white";
  celsiusItem.textContent = `Temp: ${celsius}°C`;


  
  mainCardLeft.appendChild(cityNameItem, celsiusItem);
  mainCardRight.appendChild(cityNameItem);
  mainCard.appendChild(mainCardLeft, mainCardRight);
}

async function renderForecastCards() {
  // Get the forecast container
  // const forecastContainer = document.getElementById("forecast");
  // forecastContainer.innerHTML = "";
  // // Create a new card
  // const card = document.createElement("div");
  // card.className = "bg-white w-full p-5 text-center rounded-lg cursor-pointer hover:shadow-md active:scale-95 mb-5 text-gray-800 text-4xl list-none";
  // // Append the new card to the forecast container
  // forecastContainer.appendChild(card);
}

async function searchHistory(citySearched) {
  console.log("citySearched:", citySearched);

  // Get the search history container
  const history = document.getElementById("searchHistory");

  history.innerHTML = "";

  citySearched.map((city) => {
    // Create a new list item
    const listItem = document.createElement("li");
    listItem.className =
      "bg-white w-full p-5 text-center rounded-lg cursor-pointer hover:shadow-md active:scale-95 mb-5 text-gray-800 text-4xl list-none";
    listItem.textContent = city;
    listItem.onclick = () => getWeather(city);

    // Append the new list item to the search history container
    history.appendChild(listItem);
  });
}

// document.getElementById('search-form').onsubmit = getWeather();
