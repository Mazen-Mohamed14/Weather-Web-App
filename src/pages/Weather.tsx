import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HeadlessUI from "../components/HeadlessUI";
import Icon from "../components/Icon";
import useWeatherData from "../hooks/useWeatherData";

const Weather = () => {
  const { cityName } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const weatherData = useWeatherData(lat || "", long || "");

  // later, add handling logic in useWeatherData for empty lat/long

  function getWeekday(dateString: any) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  }

  if (!weatherData) {
    return <div></div>;
  }

  return (
    <div className="overflow-hidden font-sans">
      <div className=" mt-16 flex flex-col items-center justify-center">
        <p className="text-2xl">{cityName}</p>
        <div className="flex flex-row items-center">
          <p className="text-9xl mt-2 pl-9 ">
            {Math.round(weatherData?.current?.temperature_2m)}°
          </p>
          <img
            src={`/icons/${Icon.get(weatherData?.current?.weather_code)}.png`}
            alt="weather-icon"
            className="w-20 h-20 drop-shadow-xl "
          />
        </div>
        <div className="flex flex-row mt-8 mb-5 text-base text-gray-600 ">
          <div className="mr-5 flex flex-row gap-5 text-lg">
            <p>
              Feels like{" "}
              {Math.round(weatherData?.current?.apparent_temperature)}°
            </p>
            <p>Humidity {weatherData?.current?.relative_humidity_2m}%</p>
            <p>Wind {Math.round(weatherData?.current?.wind_speed_10m)} m/s</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        {weatherData?.daily && (
          <div className="p-4 flex sm:flex-col  gap-10  lg:flex-column xl:flex-row justify-center items-center drop-shadow-xl">
            {[...Array(weatherData.daily.time.length)].map((_, index) => (
              <div
                key={index}
                className="mx-10 flex flex-col justify-center items-center gap-5 text-lg"
              >
                <p>{getWeekday(weatherData.daily.time[index])}</p>
                <img
                  src={`/icons/${Icon.get(
                    weatherData.daily.weather_code[index]
                  )}.png`}
                  alt="weather-icon"
                  className="w-20 h-20 "
                />
                <div className="text-base">
                  <span className="1.5">
                    {weatherData.daily.temperature_2m_max[index]}° /
                  </span>
                  <span> {weatherData.daily.temperature_2m_min[index]}°</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-10 mb-10 flex flex-col justify-center items-center">
        <HeadlessUI></HeadlessUI>
      </div>
    </div>
  );
};

export default Weather;
