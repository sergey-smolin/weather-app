import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { getName } from 'country-list';

// Load environment variables
dotenv.config();

const app = express();
const port = 8000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Helper function to fetch additional location data
async function getSubdivision(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`);
        const data = await response.json();
        return data.address.state || data.address.region || null;
    } catch (error) {
        console.error('Error fetching subdivision:', error);
        return null;
    }
}

// API route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        // Fetch weather data from OpenWeatherMap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            const lat = data.coord.lat;
            const lon = data.coord.lon;

            // Fetch the administrative subdivision (state, province, etc.)
            const subdivision = await getSubdivision(lat, lon);

            // Convert the two-letter country code to a full country name
            const countryName = getName(data.sys.country) || data.sys.country;

            res.json({
                city: data.name,
                country: countryName,
                subdivision,
                temperature: data.main.temp,
                description: data.weather[0].description,
                timezone: data.timezone,
                icon: data.weather[0].icon 
            });
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
