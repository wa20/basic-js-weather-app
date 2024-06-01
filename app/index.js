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
