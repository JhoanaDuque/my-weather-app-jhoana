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
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like-this").innerHTML = Math.round(
    response.data.main.feels_like
  );
}

function search(city) {
  let apiKey = "516c651b8f335e60369b9009c2ec48f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

function fahrenheitScale(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = Math.round((celsiusTemperature *9)/5 +32);
}

function celsiusScale(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let celsiusTemperatureButton = document.querySelector("#celsius-button");
celsiusTemperatureButton.addEventListener("click", celsiusScale);

let fahrenheitTemperatureButton = document.querySelector("#fahrenheit-button");
fahrenheitTemperatureButton.addEventListener("click", fahrenheitScale);

search("Winnipeg");
