import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import WeatherIcon from './weathericon';

interface WeatherTableProps {
  weatherData: any;
}

const WeatherTable: React.FC<WeatherTableProps> = ({
  weatherData,
}) => {

    const dates = weatherData.daily.time;
    const maxTemperatures: number[] = weatherData.daily.temperature2mMax;
    const minTemperatures: number[] = weatherData.daily.temperature2mMin;
    const weatherCode: number[] = weatherData.daily.weatherCode
    const precipitationProbabilityMax: number[] = weatherData.daily.precipitationProbabilityMax;


  // Function to format date without year
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  return (
    <Table variant='simple' size='sm'>
      {/* <Thead>
        <Tr>
          {dates.map((date, index) => (
            <Th key={index}>{formatDate(date)}</Th>
          ))}
        </Tr>
      </Thead> */}
      <Tbody>
        <Tr>
          {Array.from(maxTemperatures).map((maxTemp: number, index: number) => (
            <Th key={index}>
              {Math.round(maxTemp)}°| {Math.round(minTemperatures[index])}°
            </Th>
          ))}
        </Tr>
        <Tr>
          {Array.from(weatherCode).map((code, index) => (
            <Th key={index}><WeatherIcon weatherCode={code}/></Th>
          ))}
        </Tr>
        <Tr>
          {Array.from(precipitationProbabilityMax).map((precipMax, index) => (
            <Th key={index}>{Math.round(precipMax)}%</Th>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
};

export default WeatherTable;
