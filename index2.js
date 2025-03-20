const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API Key

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert("City not found.");
            return;
        }

        const weatherData = data.main;
        const weatherDescription = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const cityName = data.name;

        document.getElementById('city-name').textContent = `${cityName}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${weatherData.temp}°C`;
        document.getElementById('description').textContent = `Description: ${weatherDescription}`;
        document.getElementById('humidity').textContent = `Humidity: ${weatherData.humidity}%`;
        document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;

        document.getElementById('weather-data').style.display = 'block';
    } catch (error) {
        alert("Error fetching weather data.");
    }
}
