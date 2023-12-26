import React, { useState, useEffect } from 'react';

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiKey = 'd54f2e8af44fecd1bbf34ee09e8c6763'; // Ensure this is correct
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();

                setWeatherData(data);
                setError(null); // Reset error on successful fetch
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError(error.message);
                setWeatherData(null); // Reset weather data on error
            }
        };

        fetchWeatherData();
    }, [city]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!weatherData) {
        return <div>Loading weather data...</div>;
    }

    return (
        <div style={weatherContainerStyle}>
            <h2>Weather in {city}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} km/h</p>
        </div>
    );
};

// Weather container style
const weatherContainerStyle = {
    backgroundColor: '#1f2937',
    color: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
};

export default Weather;
