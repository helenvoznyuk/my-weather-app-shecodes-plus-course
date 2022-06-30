// displaying current day and time below the location

let now = new Date();

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let correctDateFormat = `${day} ${hours}:${minutes}`;

let spanDate = document.querySelector("#current-date");
spanDate.innerHTML = correctDateFormat;

//submitting location name via clicking 'Search' button next to the input field
// +
//allowing to enter the city -> displaying its name and current temperature

function showLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#city-input");

  let displayedLocation = document.querySelector("#entered-location");
  displayedLocation.innerHTML = locationInput.value;

  let apiKey = "d79bb097b2e1cbd47665f848849e6265";

  let city = document.querySelector("#city-input");
  enteredCity = city.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`;

  function showWeather(response) {
    let enteredTemp = Math.round(response.data.main.temp);
    let correctTemp = document.querySelector("#main-temperature");
    correctTemp.innerHTML = `${enteredTemp}`;

    let displayedCondition = document.querySelector("#weather-condition");
    displayedCondition.innerHTML = response.data.weather[0].main;
  }

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#city-input-form");
form.addEventListener("submit", showLocation);

// //converting temperature value
// function convertToCelsius(event) {
//   event.preventDefault();
//   let celsiusValueDisplayed = document.querySelector("#main-temperature");
//   celsiusValueDisplayed.innerHTML = 22;
// }

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let fahrenheitValueDisplayed = document.querySelector("#main-temperature");
//   fahrenheitValueDisplayed.innerHTML = 71.6;
// }

// let celsiusValue = document.querySelector("#celsius-link");
// celsiusValue.addEventListener("click", convertToCelsius);

// let fahrenheitValue = document.querySelector("#fahrenheit-link");
// fahrenheitValue.addEventListener("click", convertToFahrenheit);

function myCurrentWeather(response) {
  let detectedTemp = Math.round(response.data.main.temp);
  let correctTemp = document.querySelector("#main-temperature");
  correctTemp.innerHTML = `${detectedTemp}`;

  let displayedLocation = document.querySelector("#entered-location");
  displayedLocation.innerHTML = "Your current location";

  let displayedCondition = document.querySelector("#weather-condition");
  displayedCondition.innerHTML = response.data.weather[0].main;
}

function getPosition(position) {
  let apiKey = "d79bb097b2e1cbd47665f848849e6265";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(myCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let updateButton = document.querySelector("#current-city-input-button");
updateButton.addEventListener("click", getCurrentPosition);
