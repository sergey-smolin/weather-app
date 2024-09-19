// Function to fetch and display the weather
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) {
        weatherInfo.innerHTML = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            // Append the country and subdivision (if available) to the city name
            const location = data.subdivision ? `${data.city}, ${data.subdivision}, ${data.country}` : `${data.city}, ${data.country}`;
            weatherInfo.innerHTML = `
                <h3>${location}</h3>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Weather: ${data.description}</p>
            `;
        } else {
            weatherInfo.innerHTML = data.error;
        }
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching weather data.';
        console.error('Error:', error);
    }
}

// Add an event listener to detect when the user presses the "Enter" key
document.getElementById('cityInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
