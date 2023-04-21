let date = new Date();
let currentDate = date.getDate();
let hour = date.getHours();
let minutes = date.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let p = document.querySelector("#date");
p.innerHTML = `${day} ${currentDate}, ${hour}:${minutes}`;

function celciusTemperature(event) {
  event.preventDefault();
  let temperaturePoint = document.querySelector("#temperaturePoint");
  temperaturePoint.innerHTML = 19;
}

let celciusUnit = document.querySelector("#celcius-unit");
celciusUnit.addEventListener("click", celciusTemperature);

function fahrenheitTemperature(event) {
  event.preventDefault();
  let temperaturePoint = document.querySelector("#temperaturePoint");
  temperaturePoint.innerHTML = 66;
}

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", fahrenheitTemperature);

//

function locationTemperature(response) {
  console.log(response.data);
  let cityLocation = document.querySelector("#enterCity");
  cityLocation.innerHTML = response.data.name;
  let tempNumber = Math.round(response.data.main.temp);
  let temperatureNow = document.querySelector("#temperaturePoint");
  temperatureNow.innerHTML = `${tempNumber}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "d3cfc8e21373609a59380c0e9070f5be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(locationTemperature);
}

function newLocation(position) {
  console.log(position);
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  //let city = "London";
  let apiKey = "d3cfc8e21373609a59380c0e9070f5be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(locationTemperature);
}

function currentPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(newLocation);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}
let search = document.querySelector("#search-button");
search.addEventListener("click", citySearch);
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentPosition);
