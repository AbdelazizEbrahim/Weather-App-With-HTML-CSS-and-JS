const apiKey = "enter ur api key here";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        const weatherCondition = data.weather[0].main; // Correct property to check the weather condition

        if (weatherCondition === 'Clouds') {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === 'Clear') {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === 'Rain') {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === 'Drizzle') {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherCondition === 'Mist') {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
