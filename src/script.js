// displaying current day and time below the location

function displayDayTime() {
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
  let correctDateFormat = `UPD: ${day} ${hours}:${minutes}`;

  let spanDate = document.querySelector("#current-date");
  spanDate.innerHTML = correctDateFormat;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastHTML = `<div class="card-body">
  <div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
     <div class="card day-one" style="width: 150px">
              <div class="card-body">
                <span class="monday">${day}</span>
                <i class="fa-solid fa-cloud-sun icon-cloud-sun"></i>
                <span class="temp-max temperature-monday">21° |</span>
                <span class="temp-min temperature-monday">9°</span>
              </div>
            </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let enteredTemp = Math.round(response.data.main.temp);
  let correctTemp = document.querySelector("#main-temperature");
  correctTemp.innerHTML = `${enteredTemp}`;

  celsiusTemperature = Math.round(response.data.main.temp);

  let displayedConditionCity = document.querySelector("#weather-condition");
  displayedConditionCity.innerHTML = response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function showLocation(event) {
  event.preventDefault();
  let locationInput = document.querySelector("#city-input");

  let displayedLocation = document.querySelector("#entered-location");
  displayedLocation.innerHTML = locationInput.value;

  let apiKey = "d79bb097b2e1cbd47665f848849e6265";

  let city = document.querySelector("#city-input");
  enteredCity = city.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#main-temperature");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#main-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function myCurrentWeather(response) {
  let detectedTemp = Math.round(response.data.main.temp);
  let correctTemp = document.querySelector("#main-temperature");
  correctTemp.innerHTML = `${detectedTemp}`;

  let displayedLocation = document.querySelector("#entered-location");
  displayedLocation.innerHTML = "Current location";

  celsiusTemperature = Math.round(response.data.main.temp);

  let displayedConditionCity = document.querySelector("#weather-condition");
  displayedConditionCity.innerHTML = response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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
getCurrentPosition();

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("#city-input-form");
form.addEventListener("submit", showLocation);

displayDayTime();
displayForecast();

// google maps intergration
// function showOnMap{
//   let key = "AIzaSyAC1-img33PKPzNjG_4hTH3rroqZc1AUgA"

//   let googleUrl = `https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=100x100&key=YOUR_API_KEY&signature=YOUR_SIGNATURE`

// }
