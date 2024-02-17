import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Weather = () => {
  const { cityName } = useParams();

  const [currentWeather, setCurrentWeather] = useState();

  const [cityData, setCityData] = useState();

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d0567773a9175ee190f9d62effeaf55a&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setCurrentWeather(data));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d0567773a9175ee190f9d62effeaf55a&units=metric`
    );
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d0567773a9175ee190f9d62effeaf55a&units=metric`
    )
      .then((response) => response.json())
      .then((data) => setCityData(data));
  }, []);

  console.log(currentWeather.weather[0].description);
  return (
    <div>
      <h1>{cityName}</h1>
      <p>{Math.round(currentWeather?.main?.temp)}°C</p>
      <p>{Math.round(currentWeather?.main?.feels_like)}°C</p>
      <p>{currentWeather?.main?.humidity}%</p>
      <p>{Math.round(currentWeather?.wind?.speed)} m/s</p>
      <p>{currentWeather?.weather[0]?.description}</p>
    </div>
  );
};

export default Weather;
