'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { fetchWeatherApi } from 'openmeteo';

// Rumney, NH: 43.802174, -71.830984



export default function Home() {

  const [data, setData] = useState<any>(null)
 
  useEffect(() => {
    async function fetchWeather() {
      // Weather vvv
      const params = {
        "latitude": 43.802174,
        "longitude": -71.830984,
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
      const weatherData = {

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
      setData(weatherData);
      console.log(weatherData);
      console.log("Weather Codes:", weatherData.daily.weatherCode);
    }

    fetchWeather();
    
  }, [])

  // Function to format date without year
  function formatDate(date: Date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Crag Weather
        </p>
      </div>
      
      <p>Rumney</p>
      <TableContainer>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              {
                data ? (data.daily.time.map((date, index) => (
                    <Th>{formatDate(date)}</Th>
                ))) : null 
              }
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
            {
                data ? (Array.from(data.daily.temperature2mMax).map((maxTemp, index) => (
                    <Th>{Math.round(maxTemp)} | {Math.round(data.daily.temperature2mMin[index])}</Th>
                ))) : null 
              }
            </Tr>
            <Tr>
              {
                data ? (Array.from(data.daily.weatherCode).map((code, index) => (
                    <Th>{code.toString()}</Th>
                ))) : null 
              }
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </main>
  );
}
