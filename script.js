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

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-lg-3 col-md-4 col-sm-5 mb-3">
        <div class="card text-center" style="width: 8rem">
          <div class="card-body">
            <h5 class="card-title">${day}</h5>
            <div class="emoji">🌥</div>
            <span class="card-text" id="wednesday-min">
              9°
            </span>
            -<span id="wednesday-max">18°</span>
          </div>
        </div>
      </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coord) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let lat = coord.lat;
  let lon = coord.lon;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=-9.13333&lat=38.71667&key=${apiKey}&units=${units}`;
  console.log(apiUrl);
  // axios.get(apiUrl).then(displayForecast);
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

function fahrenheitConversion(event) {
  event.preventDefault();
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let TemperatureElement = Math.round((celsius * 9) / 5 + 32);
  document.querySelector("#temp").innerHTML = TemperatureElement;
}

function celsiusConversion(event) {
  event.preventDefault();
  celsiusTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");
  document.querySelector("#temp").innerHTML = Math.round(celsius);
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

let celsius = null;

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", celsiusConversion);

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", fahrenheitConversion);

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitResult);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showPosition);

search("London");
displayForecast();
