import React, { useState, useEffect } from 'react'
import './Weather.css';
import { WEATHER_API_KEY } from '../../api.js';
import img1 from '../../assets/weather1.png';
import img2 from '../../assets/weather2.png';


const Weather = () => {
  const [weather, setWeather] = useState({});
  /*const [date, setDate] = useState(new Date().toLocaleDateString());*/
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    handleWeather();

    // Update current time every second to show live local time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleWeather = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Bangalore,Karnataka&aqi=no`)
      .then((res) => res.json())
      .then((data) =>
        setWeather({
          current: data.current,
          location: data.location,
        })
      )
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className='weather-container'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="weather-top">
            <p className="date">{currentTime.toLocaleDateString()}</p>
            <p className="time">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="weather-bottom">
            <div className="w-box w-box1">
              <span className='w-box1-span'>
                <img src={weather.current.condition.icon} alt="weather" />
              </span>
              <p className='w-box1-txt'>{weather.current.condition.text}</p>
            </div>
            <div className="line"></div>
            <div className="w-box w-box2">
              <p className="w-box2-txt-1">{weather.current.temp_c}°C</p>
              <p className="w-box2-txt-2">
                <span className='w-box2-span'>
                  <img src={img1} alt='pressure-img' width="14px" />
                </span>
                {weather.current.pressure_mb} mbar <br />Pressure</p>
            </div>
            <div className="line"></div>
            <div className="w-box w-box3">
              <p className="w-box3-txt-1"  >
                <span className="w-box3-span-1"> <img src={img2} alt='img' width="30px" /></span>
                {weather.current.wind_kph}km/h <br /> </p>
              <p className="w-box3-txt-2" >
                <span className='w-box3-svg' > <svg width="20" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.8412 19.7163C22.1285 10.7951 14.1447 1.27383 13.7388 0.792783C13.6754 0.72338 13.5983 0.667949 13.5123 0.630023C13.4263 0.592097 13.3333 0.57251 13.2393 0.57251C13.1453 0.57251 13.0524 0.592097 12.9664 0.630023C12.8804 0.667949 12.8032 0.72338 12.7398 0.792783C12.3339 1.27383 4.34879 10.7937 1.63469 19.7163C1.07848 21.5462 0.725891 23.3543 0.725891 25.0502C0.725891 31.9489 6.33995 37.5616 13.2386 37.5616C20.1373 37.5616 25.7486 31.9489 25.7486 25.0502C25.75 23.3543 25.3974 21.5476 24.8412 19.7163ZM13.24 36.2551C7.06153 36.2551 2.03511 31.2287 2.03511 25.0516C2.03511 23.3748 2.4082 21.5626 3.00404 19.7177C5.37786 12.3721 11.4538 4.47172 13.24 2.25096C15.0262 4.47172 21.1021 12.3721 23.4732 19.7177C24.0691 21.564 24.4422 23.3748 24.4422 25.0516C24.4422 31.2287 19.4171 36.2551 13.24 36.2551Z" fill="white" />
                  <path d="M6.22655 19.7166C5.54324 21.4522 5.08679 23.1905 5.08679 24.773C5.08679 26.9352 5.94572 29.0089 7.47462 30.5378C9.00352 32.0667 11.0772 32.9256 13.2393 32.9256C15.4015 32.9256 17.4752 32.0667 19.0041 30.5378C20.533 29.0089 21.3919 26.9352 21.3919 24.773C21.3919 23.1905 20.9354 21.4522 20.2521 19.7166H6.22655Z" fill="white" />
                </svg>
                </span>
                {weather.current.humidity}% <span className='w-box3-span-2'><br />Humidity</span></p>
            </div>
          </div>
        </>
      )
      }
    </div>
  )
}

export default Weather