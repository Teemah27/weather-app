function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-lg-3 col-md-4 col-sm-5 mb-3">
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-temperatures">
            <span class="card-text" id="wednesday-max">
              ${Math.round(forecastDay.temp.max)}°
            </span>
            <div class= "weather-temperature-min" id="wednesday-min">${Math.round(
              forecastDay.temp.min
            )}°</div>
          </div>
        </div>
      </div>
      </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord) {
  console.log(coord);
  let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
  let lat = coord.lat;
  let lon = coord.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  celsius = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsius);
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#bright").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#dark").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "af12a2daa1c4c04cebdde84de8f2f6a6";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function submitResult(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function getCurrentLocation(position) {
  let apiKey = "af12a2daa1c4c04cebdde84de8f2f6a6";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitResult);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showPosition);

search("London");
