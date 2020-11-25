function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturaday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description);
  
}

function search(event) {
  event.preventDefault();
  let apiKey = "860061f9d9c92d44c80390302fc486d6";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let searchForm = document.querySelector(".search");
let iconElement = document.querySelector("#icon");

searchForm.addEventListener("submit", search);

dateElement.innerHTML = formatDate(currentTime);

function displayFahrenheitTemp(event) {
event.preventDefault();
celsiusLink.classList.remove("units");
fahrenheitLink.classList.add("units");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let p = document.querySelector("#temperature");
p.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
event.preventDefault(); 
celsiusLink.classList.add("units");
fahrenheitLink.classList.remove("units");
let p = document.querySelector("#temperature");
p.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);