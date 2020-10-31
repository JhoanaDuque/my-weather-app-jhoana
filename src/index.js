  function formatDate(timestamp) {
  let date = new Date(timestamp);
   
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like-this").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  celsiusTemperature = response.data.main.temp;
   getUVIndex(response);
   let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showUV(response) {
  if (response.data.value >= 1 && response.data.value < 2) {
    document.querySelector("#uvindex").innerHTML = `${Math.round(response.data.value)} Low`;
  } else if (response.data.value >= 3 && response.data.value < 5) {
    document.querySelector(
      "#uvindex"
    ).innerHTML = `${Math.round(response.data.value)} Moderate`;
  } else if (response.data.value >= 6 && response.data.value < 7) {
    document.querySelector(
      "#uvindex"
    ).innerHTML = `${Math.round(response.data.value)} High`;
  } else if (response.data.value >= 8 && response.data.value < 10) {
    document.querySelector(
      "#uvindex"
    ).innerHTML = `${Math.round(response.data.value)} Very high`;
  } else {
    document.querySelector(
      "#uvindex"
    ).innerHTML = `${Math.round(response.data.value)} Extreme`;
  }
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function search(city) {
    let apiKey = "516c651b8f335e60369b9009c2ec48f5";
    let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl1).then(showTemperature);
  apiUrl3 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl3).then(displayForecast);
  }


function getUVIndex(response){ 
  let lati = response.data.coord.lat;
  let long = response.data.coord.lon;
  let apiKey = "516c651b8f335e60369b9009c2ec48f5";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/uvi?lat=${lati}&lon=${long}&appid=${apiKey}`;
  axios.get(apiUrl2).then(showUV);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

function fahrenheitScale(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = Math.round((celsiusTemperature *9)/5 + 32);
  document.querySelector("#degrees").innerHTML = "°F";
  document.querySelector("#feels-like-this").innerHTML = Math.round((celsiusTemperature *9)/5 + 32);
  document.querySelector("#feels-degrees").innerHTML = "°F";
}

function celsiusScale(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#degrees").innerHTML = "°C";
  document.querySelector("#feels-like-this").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#feels-degrees").innerHTML = "°C";
}
let celsiusTemperature = null;

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let celsiusTemperatureButton = document.querySelector("#celsius-button");
celsiusTemperatureButton.addEventListener("click", celsiusScale);

let fahrenheitTemperatureButton = document.querySelector("#fahrenheit-button");
fahrenheitTemperatureButton.addEventListener("click", fahrenheitScale);

search("Winnipeg");
