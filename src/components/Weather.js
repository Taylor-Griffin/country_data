import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});

  useEffect(() => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}&units=imperial`
        )
        .then((res) => setWeather(res.data));
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country.capital]);
  return (
    <div>
      <h2>Weather in {country?.capital}</h2>
      <p>Temperature {weather?.main?.temp.toFixed(0)}&deg; Farenheit</p>
      <img
        src={` http://openweathermap.org/img/wn/${weather?.weather?.map(
          (item) => item.icon
        )}@2x.png`}
        alt={weather.description}
      />
      <p>{weather?.weather?.map((item) => item.description)}</p>
      <p>Wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};

export default Weather;
