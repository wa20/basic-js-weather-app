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

    const mainCardLeft = document.getElementById("mainCardLeft");
    const mainCardRight = document.getElementById("mainCardRight");

    const today = moment().format("ddd MMM Do");

    const cityName = data.name;
    const tempRaw = data.main.temp;
    const celsius = ((tempRaw - 273.15)).toFixed(1);  // Converting to Celsius

    const feelsLike = ((data.main.feels_like - 273.15)).toFixed(1); // Converting to Celsius
    const tempMax = ((data.main.temp_max - 273.15)).toFixed(1); // Converting to Celsius
    const humidity = data.main.humidity;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Weather icon and description
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    // Clear previous content
    mainCardLeft.innerHTML = "";
    mainCardRight.innerHTML = "";

    // Current weather details
    const cityNameItem = document.createElement("p");
    const celsiusItem = document.createElement("p");
    const feelsLikeItem = document.createElement("p");
    const tempMaxItem = document.createElement("p");
    const humidityItem = document.createElement("p");
    const sunriseItem = document.createElement("p");
    const sunsetItem = document.createElement("p");

    // Current weather icon and description
    const iconItem = document.createElement("img");
    const descriptionItem = document.createElement("p");

    // Set classes and text content
    cityNameItem.className = "text-6xl font-semibold";
    cityNameItem.textContent = `${cityName} | ${today}`;

    celsiusItem.className = "text-4xl";
    celsiusItem.textContent = `Temp: ${celsius}°C`;

    feelsLikeItem.className = "text-4xl";
    feelsLikeItem.textContent = `Feels Like: ${feelsLike}°C`;

    tempMaxItem.className = "text-4xl font";
    tempMaxItem.textContent = `Max Temp: ${tempMax}°C`;

    humidityItem.className = "text-4xl";
    humidityItem.textContent = `Humidity: ${humidity}%`;

    sunriseItem.className = "text-4xl";
    sunriseItem.textContent = `Sunrise: ${sunrise} AM`;

    sunsetItem.className = "text-4xl";
    sunsetItem.textContent = `Sunset: ${sunset} PM`;

    iconItem.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    iconItem.className = "w-[350px] h-[350px] mx-auto";
    descriptionItem.className = "text-4xl";
    descriptionItem.textContent = description;

    // Append items to main card
    mainCardLeft.appendChild(cityNameItem);
    mainCardLeft.appendChild(celsiusItem);
    mainCardLeft.appendChild(feelsLikeItem);
    mainCardLeft.appendChild(tempMaxItem);
    mainCardLeft.appendChild(humidityItem);
    mainCardLeft.appendChild(sunriseItem);
    mainCardLeft.appendChild(sunsetItem);

    mainCardRight.appendChild(iconItem);
    mainCardRight.appendChild(descriptionItem);
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
