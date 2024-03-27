import { useEffect, useState } from "react";

const useWeatherData = (lat: string, long: string) => {
  const [cityData, setCityData] = useState(null as any);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min`
      );
      const data = await response.json();
      setCityData(data);
    };
    fetchWeatherData();
  }, [lat, long]);
  return cityData;
};

export default useWeatherData;
