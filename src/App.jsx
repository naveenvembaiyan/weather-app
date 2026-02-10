import { useState } from 'react';

const weatherCodeLabel = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Heavy thunderstorm with hail',
};

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

function App() {
  const [location, setLocation] = useState('New York');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async (event) => {
    event.preventDefault();

    if (!location.trim()) {
      setError('Please enter a location.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location.trim(),
        )}&count=1&language=en&format=json`,
      );

      if (!geoResponse.ok) {
        throw new Error('Could not search for location.');
      }

      const geoData = await geoResponse.json();
      const match = geoData.results?.[0];

      if (!match) {
        throw new Error('No matching location found.');
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${match.latitude}&longitude=${match.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=6`,
      );

      if (!weatherResponse.ok) {
        throw new Error('Weather service is currently unavailable.');
      }

      const weatherData = await weatherResponse.json();

      setPlaceName(`${match.name}, ${match.country}`);
      setCurrentWeather(weatherData.current);
      setForecast(
        weatherData.daily.time.slice(1).map((date, index) => ({
          date,
          weatherCode: weatherData.daily.weather_code[index + 1],
          max: weatherData.daily.temperature_2m_max[index + 1],
          min: weatherData.daily.temperature_2m_min[index + 1],
        })),
      );
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong.');
      setCurrentWeather(null);
      setForecast([]);
      setPlaceName('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="weather-card">
        <h1>Weather App</h1>
        <p className="subtitle">Check current weather and 5-day forecast.</p>

        <form onSubmit={getWeather} className="location-form">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city (e.g. London)"
            aria-label="City"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {currentWeather && (
          <>
            <article className="current-weather">
              <h2>{placeName}</h2>
              <p className="condition">
                {weatherCodeLabel[currentWeather.weather_code] ?? 'Unknown condition'}
              </p>
              <p className="temp">{Math.round(currentWeather.temperature_2m)}°C</p>
              <ul>
                <li>Feels like: {Math.round(currentWeather.apparent_temperature)}°C</li>
                <li>Humidity: {currentWeather.relative_humidity_2m}%</li>
                <li>Wind: {Math.round(currentWeather.wind_speed_10m)} km/h</li>
              </ul>
            </article>

            <section className="forecast">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast.map((day) => (
                  <article key={day.date} className="forecast-item">
                    <p>{formatDate(day.date)}</p>
                    <p>{weatherCodeLabel[day.weatherCode] ?? 'Unknown'}</p>
                    <p>
                      <strong>{Math.round(day.max)}°</strong> / {Math.round(day.min)}°
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
