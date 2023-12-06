import { fetchData } from "./scripts/getWeather.js";
import { codes } from "./scripts/weathercodes.js";
import Weather from "./scripts/parseWeather.js";

const searchedCityEl = document.querySelector(".search-input");
const slider = document.querySelector(".hour-selector");
const dayRows = document.querySelectorAll(".day-row");
const tempButton = document.querySelector(".buttons .temp");
const precipButton = document.querySelector(".buttons .precip");
const windButton = document.querySelector(".buttons .wind");
const chartsEl = document.querySelector(".charts");

slider.setAttribute("value", "0");

let daily, hourly;

const newSearch = (city) => {
  fetchData(city)
    .then((data) => {
      searchedCityEl.value = city;
      const weather = new Weather(data);
      hourly = weather.parseHourlyData();
      daily = weather.parseDailyData();
      displayHourly(0, hourly);
      displayDaily(daily, "temp");
      console.log(daily);
    })
    .catch((e) => console.log(e));
};

if (localStorage.getItem("data") !== null) {
  const data = JSON.parse(localStorage.getItem("data"));
  searchedCityEl.value = localStorage.getItem("city");
  daily = data.daily;
  hourly = data.hourly;
  displayHourly(0, hourly);
  displayDaily(daily, "temp");
} else {
  newSearch("Krakow");
}

searchedCityEl.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    newSearch(searchedCityEl.value);
    localStorage.setItem("city", searchedCityEl.value);
  }
});

chartsEl.addEventListener("click", () => {
  if (localStorage.getItem("city")) {
    localStorage.setItem(
      "data",
      JSON.stringify({ daily: daily, hourly: hourly }),
    );
    window.location.href = "charts.html";
  }
});

slider.addEventListener("input", (event) => {
  const forecastHour = event.target.value;
  displayHourly(forecastHour, hourly);
  console.log("slider");
});

tempButton.addEventListener("click", () => {
  displayDaily(daily, "temp");
});

precipButton.addEventListener("click", () => {
  displayDaily(daily, "precip");
});

windButton.addEventListener("click", () => {
  displayDaily(daily, "wind");
});

function displayDaily(daily, value) {
  document.querySelector(".active-button").classList.remove("active-button");

  dayRows.forEach((dayRow, index) => {
    const valEl = dayRow.querySelector(".val");
    const dayEl = dayRow.querySelector(".day");
    const imageEl = dayRow.querySelector("img");
    if (value == "temp") {
      valEl.innerText = daily.dailyTemp[index] + "°C";
      tempButton.classList.add("active-button");
    } else if (value == "precip") {
      valEl.innerText = daily.dailyPrecip[index] + "%";
      precipButton.classList.add("active-button");
    } else {
      valEl.innerText = daily.dailyWind[index] + "km/h";
      windButton.classList.add("active-button");
    }

    dayEl.innerText = daily.days[index];
    imageEl.src = codes[daily.weathercode[index]].imagePath;
  });
}

function displayHourly(forecastHour, hourly) {
  const dayOfWeek = hourly.days[forecastHour];
  document.querySelector(".date-time").innerText =
    dayOfWeek + ", " + hourly.hours[forecastHour];
  document.querySelector(".rain .info").innerText =
    hourly.hourlyPrecip[forecastHour] + "%";
  document.querySelector(".humidity .info").innerText =
    hourly.hourlyHumid[forecastHour] + "%";
  document.querySelector(".windspeed .info").innerText =
    hourly.hourlyWind[forecastHour] + "km/h";
  document.querySelector(".curr-temp").innerText =
    hourly.hourlyTemp[forecastHour] + "°C";
  document.querySelector(".description").innerText =
    codes[hourly.weathercode[forecastHour]].description;
  document.querySelector(".curr-img").src =
    codes[hourly.weathercode[forecastHour]].imagePath;
}
