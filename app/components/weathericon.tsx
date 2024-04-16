import React from 'react';
import Image from 'next/image';

// Icons
import sunnyIcon from '../../public/weathericons/sunny.svg';
import mainlyClearIcon from '../../public/weathericons/mainly_clear.svg';
import partlycloudyIcon from '../../public/weathericons/partly_cloudy.svg';
import cloudyIcon from '../../public/weathericons/cloudy.svg';
import lightRainIcon from '../../public/weathericons/light_rain.svg';
import heavyRainIcon from '../../public/weathericons/heavy_rain.svg';
import lightSnowIcon from '../../public/weathericons/light_snow.svg';
import heavySnowIcon from '../../public/weathericons/heavy_snow.svg';
import thunderstormIcon from '../../public/weathericons/thunderstorm.svg';

interface WeatherIconProps {
  weatherCode: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherCode }) => {
  // Define a mapping between weather codes and corresponding icon URLs or icon components
  const iconMapping: Record<number, string> = {
    0: sunnyIcon, //clear sky
    1: mainlyClearIcon, // mainly clear
    2: partlycloudyIcon, // partly cloudy
    3: cloudyIcon, // overcast
    45: partlycloudyIcon, // fog
    48: partlycloudyIcon, // depositing rime fog
    51: lightRainIcon, // light drizzle
    53: lightRainIcon, // moderate drizzle
    55: lightRainIcon, // dense drizzle
    56: lightRainIcon, // light freezing drizzle
    57: lightRainIcon, // dense freezing drizzle
    61: lightRainIcon, // slight rain
    63: heavyRainIcon, // moderate rain
    65: heavyRainIcon, // heavy rain
    66: heavyRainIcon, // light frezing rain
    67: heavyRainIcon, // heavy freezing rain
    71: lightSnowIcon, // slight snow
    73: lightSnowIcon, // moderate snow
    75: heavySnowIcon, // heavy snow
    77: partlycloudyIcon, // snow grains
    80: partlycloudyIcon, // slight rain
    81: partlycloudyIcon, // moderate rain
    82: partlycloudyIcon, // violent rain
    85: lightSnowIcon, // slight snow
    86: heavySnowIcon, // heavy snow
    95: thunderstormIcon, // thunderstorm
    96: thunderstormIcon, // thunderstorm with slight hail
    99: thunderstormIcon, // thunderstorm with heavy hail
  };

  // Get the icon URL based on the weatherCode
  const iconUrl = iconMapping[weatherCode];

  // Render the icon
  return <Image height={40} width={40} src={iconUrl} alt={`Weather Icon for ${weatherCode}`} />;
};

export default WeatherIcon;
