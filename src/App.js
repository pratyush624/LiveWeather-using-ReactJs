import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "./weatherapi";

import { ScaleLoader } from "react-spinners";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Bangalore");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const data = await getWeatherData(city);
      setWeatherData(data);
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const override = `display:block;
  margin:0 auto;
  border-color:red;
  `;

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="card">
        <h2 className="title">
          <i className="fa fa-cloud">Weather App</i>
        </h2>
        <div className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city name"
          />
          <button type="button" onClick={() => getData()}>
            Search
          </button>
        </div>

        {loading ? (
          <div className="loader-container">
            <ScaleLoader
              css={override}
              size={200}
              color={"#fff"}
              loading={loading}
            />
          </div>
        ) : (
          <>
            {weatherData !== null ? (
              <div className="main-container">
                <h4>Live Weather Condition</h4>
                <div className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                    alt="imgicon"
                  />
                </div>
                <h3>{weatherData.weather[0].main}</h3>
                <div className="temperature">
                  <h1>
                    {parseFloat(weatherData.main.temp - 273.15).toFixed(1)}
                    &deg;C
                  </h1>
                </div>
                <div className="location">
                  <h3>
                    <i className="fa fa-street-view"></i>
                    {weatherData.name} | {weatherData.sys.country}
                  </h3>
                </div>
                <div className="temperature-range">
                  <h5>
                    Min:{" "}
                    {parseFloat(weatherData.main.temp_min - 273.15).toFixed(1)}
                    &deg;C || Max:{" "}
                    {parseFloat(weatherData.main.temp_max - 273.15).toFixed(1)}
                    &deg;C || Humidity: {weatherData.main.humidity}%{" "}
                  </h5>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
