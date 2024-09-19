# Weather App

This is a simple weather app built with **Node.js**, **Express**, and the **OpenWeatherMap API**. The app fetches and displays current weather information for a user-specified city, along with the full country name and administrative subdivision (state or province)

## Features

- **Current Weather**: Fetches and displays the current weather for a specified city.
- **Full Location Info**: Displays the city name, administrative subdivision (if available), and full country name.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.
- **Enter Key Support**: Allows users to press "Enter" to fetch weather data.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express**: Server framework.
- **OpenWeatherMap API**: Fetches weather data.
- **Nominatim API**: Fetches administrative subdivision (state/province) based on geolocation.
- **Country-List Library**: Converts two-letter country codes to full country names.

## Installation

To run this app locally, follow the steps below:

### Prerequisites

- **Node.js** installed on your machine.
- An **OpenWeatherMap API key** (You can sign up for free [here](https://home.openweathermap.org/users/sign_up)).

### Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    ```

2. **Install the dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file** by copying the `.env.example` template:

    ```bash
    cp .env.example .env
    ```

4. **Add your OpenWeatherMap API key** to the `.env` file:

    ```env
    API_KEY=your_openweathermap_api_key_here
    ```

5. **Start the app**:

    ```bash
    npm start
    ```

6. Open your browser and visit:

    ```
    http://localhost:8000
    ```

## How to Use

1. **Search for a city**: Enter the name of the city in the search box and press "Get Weather" or hit the "Enter" key.
3. **View weather data**: The app will display the temperature, weather description, city name, administrative subdivision (if available), and the full country name.

## Further Development

Here are some potential features you could add to further enhance this app:

- **5-day weather forecast**: Show forecast data for the next 5 days.
- **Weather alerts**: Add notifications for extreme weather events (e.g., storms, heatwaves).
- **Hourly forecast**: Add detailed hourly weather data for a more precise forecast.
- **User accounts**: Enable users to save favorite cities and view weather data quickly.
- **Multi-language support**: Allow users to view weather information in different languages.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, feel free to contact me at [soees84@gmail.com].
