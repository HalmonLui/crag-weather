import React from 'react';
import Image from 'next/image';

// Icons
import partlycloudyIcon from '../../public/weathericons/light_clouds.svg';

interface WeatherIconProps {
  weatherCode: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode }) => {
  // Define a mapping between weather codes and corresponding icon URLs or icon components
  const iconMapping: Record<number, string> = {
    0: partlycloudyIcon, //clear sky
    1: partlycloudyIcon, // mainly clear
    2: partlycloudyIcon, // partly cloudy
    3: partlycloudyIcon, // overcast
    45: partlycloudyIcon, // fog
    48: partlycloudyIcon, // depositing rime fog
    51: partlycloudyIcon, // light drizzle
    53: partlycloudyIcon, // moderate drizzle
    55: partlycloudyIcon, // dense drizzle
    56: partlycloudyIcon, // light freezing drizzle
    57: partlycloudyIcon, // dense freezing drizzle
    61: partlycloudyIcon, // slight rain
    63: partlycloudyIcon, // moderate rain
    65: partlycloudyIcon, // heavy rain
    66: partlycloudyIcon, // light frezing rain
    67: partlycloudyIcon, // heavy freezing rain
    71: partlycloudyIcon, // slight snow
    73: partlycloudyIcon, // moderate snow
    75: partlycloudyIcon, // heavy snow
    77: partlycloudyIcon, // snow grains
    80: partlycloudyIcon, // slight rain
    81: partlycloudyIcon, // moderate rain
    82: partlycloudyIcon, // violent rain
    85: partlycloudyIcon, // slight snow
    86: partlycloudyIcon, // heavy snow
    95: partlycloudyIcon, // thunderstorm
    96: partlycloudyIcon, // thunderstorm with slight hail
    99: partlycloudyIcon, // thunderstorm with heavy hail
  };

  // Get the icon URL based on the weatherCode
  const iconUrl = iconMapping[weatherCode];

  // Render the icon
  return <Image src={iconUrl} alt={`Weather Icon for ${weatherCode}`} />;
};

export default WeatherIcon;
