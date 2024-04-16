'use client'

import styles from "./page.module.css";
import { useState, useEffect } from 'react'
import { fetchWeatherApi } from 'openmeteo';
import WeatherTable from './components/WeatherTable';

// Rumney, NH: 43.802174, -71.830984
// Farley, MA: 42.597118, -72.446154
// Crow Hill, MA: 42.515625, -71.860028
// Lynn Woods, MA: 42.488762, -70.988371
// Lincoln Woods, RI: 41.898341, -71.433552
// Shawangunk, NY: 41.743576, -74.185012


export default function Home() {

  const [data, setData] = useState<any>(null)
  const [weatherDataArray, setWeatherDataArray] = useState<any>(null)
 
  useEffect(() => {
    async function fetchWeather() {
      // Weather vvv
      const params = {
        "latitude": [43.802174, 42.597118, 42.515625, 42.488762, 41.898341, 41.743576],
        "longitude": [-71.830984, -72.446154, -71.860028, -70.988371, -71.433552, -74.185012],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "precipitation_probability_max"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph",
        "precipitation_unit": "inch",
        "timezone": "America/New_York"
      };
      const url = "https://api.open-meteo.com/v1/forecast";

      const responses = await fetchWeatherApi(url, params);

      // Helper function to form time ranges
      const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response.utcOffsetSeconds();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const latitude = response.latitude();
      const longitude = response.longitude();

      const daily = response.daily()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherDataArray = responses.map(response => {
        const daily = response.daily()!;
        return {
          daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: daily.variables(0)!.valuesArray()!,
            temperature2mMax: daily.variables(1)!.valuesArray()!,
            temperature2mMin: daily.variables(2)!.valuesArray()!,
            precipitationProbabilityMax: daily.variables(3)!.valuesArray()!,
          },
        };
      });

      // `weatherData` now contains a simple structure with arrays for datetime and weather data
      // for (let i = 0; i < weatherData.daily.time.length; i++) {
      //   console.log(
      //     weatherData.daily.time[i].toISOString(),
      //     weatherData.daily.weatherCode[i],
      //     weatherData.daily.temperature2mMax[i],
      //     weatherData.daily.temperature2mMin[i],
      //     weatherData.daily.precipitationProbabilityMax[i]
      //   );
      // }

      // Weather ^^^
      setWeatherDataArray(weatherDataArray);
    }

    fetchWeather();
    
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Crag Weather
        </p>
      </div>
      
      <p>Rumney, NH</p>
      {data && <WeatherTable weatherData={weatherDataArray[0]} />}
      <p>Farley, MA</p>
      {data && <WeatherTable weatherData={weatherDataArray[1]} />}
      <p>Crow Hill, MA</p>
      {data && <WeatherTable weatherData={weatherDataArray[2]} />}
      <p>Lynn Woods, MA</p>
      {data && <WeatherTable weatherData={weatherDataArray[3]} />}
      <p>Lincoln Woods, RI</p>
      {data && <WeatherTable weatherData={weatherDataArray[4]} />}
      <p>Shawangunk, NY</p>
      {data && <WeatherTable weatherData={weatherDataArray[5]} />}
    </main>
  );
}
