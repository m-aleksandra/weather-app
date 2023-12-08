This project is a simple weather app, that fetches data from open-meteo.com. When you first run this on your machine it fetches weather for Kraków. You can search weather by typing city name in the search box and hitting enter. It displays weather for the next 24 hours from current hour on the left and weekly weather on the right. You can switch hour forecast by using the slider. When you click a button on the right it redirects you to the 14 day forecast. You can find temperature, wind and precipitation charts on this page. Data is sent between pages using local storage in your browser. 

getWeather.js - this fetches data from the API
weathercodes.js - acts like a database to store weather codes that map to different weather images
parseWeather.js - gets important data from json and parses it so it's easy to display
createCharts.js - uses charts.js library to create line and bar charts
displayChars.js - displays data on charts.html
displayWeather.js - displays data on index.html


Run this code:

1. clone this repository:
    git clone

2. go to the project directory and start server. Install
    http-server (if you haven't already)
    npm install -g http-server

3. start local server:
    http-server

4. Open your browser and acces application at http://localhost:8080 (or different port number depending on your output)



