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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="card-body">
  <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="card day-one" style="width: 150px">
              <div class="card-body">
                <span class="monday">${formatDay(forecastDay.dt)}</span>
                <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="70px"
          id="forecast-icons"
        />
       
        <div class="temperature-daily-wrapper">
                <span class="temp-max temperature-daily">${Math.round(
                  forecastDay.temp.max
                )}° |</span>
                <span class="temp-min temperature-daily">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
              </div>
            </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d79bb097b2e1cbd47665f848849e6265";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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

  getForecast(response.data.coord);
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
