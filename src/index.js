let now = new Date();
let h3 = document.querySelector("#current-date");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
h3.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
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

function celsiusScale(event) {
  event.preventDefault();
  let p = document.querySelector("#current-temperature");
  p.innerHTML = 25;
}

function fahrenheitScale(event) {
  event.preventDefault();
  let p = document.querySelector("#current-temperature");
  p.innerHTML = 50;
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let celsiusTemperatureButton = document.querySelector("#celsius-button");
celsiusTemperatureButton.addEventListener("click", celsiusScale);

let fahrenheitTemperatureButton = document.querySelector("#fahrenheit-button");
fahrenheitTemperatureButton.addEventListener("click", fahrenheitScale);

search("New York");
