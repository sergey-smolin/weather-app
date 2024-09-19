// Function to fetch and display the weather and local time
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (!city) {
        weatherInfo.innerHTML = 'Please enter a city name.';
        return;
    }

    weatherInfo.innerHTML = '';  // Clear the previous weather info
    loadingSpinner.style.display = 'block';

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        loadingSpinner.style.display = 'none';

        if (response.ok) {
            // Append the country and subdivision (if available) to the city name
            const location = data.subdivision ? `${data.city}, ${data.subdivision}, ${data.country}` : `${data.city}, ${data.country}`;

            const utcTime = new Date(); // Get current UTC time
            const localTime = new Date(utcTime.getTime() + data.timezone * 1000); // Calculate local time

            const formatter = new Intl.DateTimeFormat(undefined, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,  // This ensures we get AM/PM format
                timeZone: 'UTC'    // Treat our adjusted time as if it were UTC
              });
            
            // Format and return the time string
            const localTimeStr = formatter.format(localTime);

            weatherInfo.innerHTML = `
                <h3>${location}</h3>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Weather: ${data.description}</p>
                <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Weather icon">
                <p>Local Time: ${localTimeStr}</p>
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

// Dark Mode Toggle Handler
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const weatherContainer = document.querySelector('.weather-container');
const weatherInfo = document.querySelector('.weather-info');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

function enableDarkMode() {
    body.classList.add('dark-mode');
    weatherContainer.classList.add('dark-mode');
    weatherInfo.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');  // Save preference
}

function disableDarkMode() {
    body.classList.remove('dark-mode');
    weatherContainer.classList.remove('dark-mode');
    weatherInfo.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');  // Save preference
}
