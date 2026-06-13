import { useState, useEffect } from "react";
import countriesService from "../Services/countries";

const Weather = ({ country }) => {
  const [wind, setWind] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [code, setCode] = useState(null);
  const apiKey = import.meta.env.VITE_SOME_KEY;
  const capital = country.capital[0];

  useEffect(() => {
    countriesService.getWeather(capital, apiKey).then((weatherData) => {
      setCode(weatherData.weather[0].icon);
      setTemperature(weatherData.main.temp);
      setWind(weatherData.wind.speed);
    });
  }, [apiKey, capital, code]);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        Temperature {Math.round((temperature - 273.15) * 10) / 10} {`\u00B0C`}
      </p>
      <img
        src={`https://openweathermap.org/payload/api/media/file/${code}.png`}
        alt=""
      />
      <p>Wind {wind}</p>
    </div>
  );
};

export default Weather;
