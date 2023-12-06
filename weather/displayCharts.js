import { createLineChart, createBarChart } from "./scripts/createCharts.js";

const city = localStorage.getItem("city");
document.querySelector("#city").innerText = city;

const data = JSON.parse(localStorage.getItem("data"));
const daily = data.daily;

const ctxTemp = document.querySelector(".temp-chart").getContext("2d");
const ctxPrecip = document.querySelector(".precip-chart").getContext("2d");
const ctxWind = document.querySelector(".wind-chart").getContext("2d");

const tempBtn = document.querySelector(".temp");
const windBtn = document.querySelector(".wind");
const precipBtn = document.querySelector(".precip");
const backBtn = document.querySelector(".back");


createLineChart(ctxTemp, "Daily Temperature", daily.dates, daily.dailyTemp);
createBarChart(ctxPrecip, "Daily Precipation", daily.dates, daily.dailyPrecip);
createLineChart(ctxWind, "Daily Windspeed", daily.dates, daily.dailyPrecip);

backBtn.addEventListener("click", () => {
  localStorage.setItem("data", JSON.stringify(data));
  window.location.href = "index.html";
});

tempBtn.addEventListener("click", () => {
  document.querySelector(".active").classList.remove("active");
  tempBtn.classList.add("active");
  document.querySelector(".current").classList.remove("current");
  document.querySelector("#temp").classList.add("current");
});

precipBtn.addEventListener("click", () => {
  document.querySelector(".active").classList.remove("active");
  precipBtn.classList.add("active");
  document.querySelector(".current").classList.remove("current");
  document.querySelector("#precip").classList.add("current");
});

windBtn.addEventListener("click", () => {
  document.querySelector(".active").classList.remove("active");
  windBtn.classList.add("active");
  document.querySelector(".current").classList.remove("current");
  document.querySelector("#wind").classList.add("current");
});
