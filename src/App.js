import React, { useEffect, useState } from "react";
import Search from "./components/search";
import { useSelector, useDispatch } from 'react-redux'
import Weather from "./components/weatherComponents/weather";
import Pollution from "./components/airPollutionComponents/pollutionDetails";
import HourlyWeatherData from "./components/historicWeather/HourlyWeatherData";
import DailyWeatherData from "./components/dailyWeatherData/DailyWeatherData";
import { setProgress, setCoordinates, setCity, setCountry, setPollutants, setPollutionData, setBulkWeatherData, setData } from '../src/actions'
import './App.css';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import icons from "./Asset/SVG/svgIcons";

import LoadingBar from 'react-top-loading-bar'
import News from "./components/newsComponents/news";
import ContactInfo from "./components/contactComponents/ContactInfo";

var gettingAddress = false;

function hideMap() {
  document.querySelector("#mapCont").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
}

function activate(svgId) {
  for (let i = 1; i < 8; i++) {
    document.querySelector(`#svg${i}`).classList.remove("nav-icon-active");
  }
  document.querySelector(`#${svgId}`).classList.add("nav-icon-active");
}

async function getAddressData(coord, dispatch, setProgress) {
  try {
    gettingAddress = true;
    setProgress(20);
    const key = "473fd137f28cd8094a012d62483d9695";
    const lat = coord[0];
    const lon = coord[1];
    dispatch(setPollutionData({}));
    dispatch(setBulkWeatherData({}));
    dispatch(setData({}));
    dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
    console.log("getting address");
    var res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=473fd137f28cd8094a012d62483d9695&query=${lat},${lon}`);
    setProgress(40)
    const data = await res.json();
    setProgress(55)
    var resData = data.data ? data.data : {};
    dispatch(setCountry((resData[0]?.country) ? resData[0].country : "--"));
    dispatch(setCity((resData[0]?.locality) ? resData[0].locality : (resData[0]?.label) ? `--resetCity--${resData[0].label}` : "--"));
    setProgress(75)
    gettingAddress = false;
    hideMap();
  } catch (error) {
    dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
    hideMap();
    alert(`Something Went Wrong :( \n${error}`)
  } finally {
    setProgress(100);
  }
}

function App() {
  const location = useLocation();
  console.log(location)
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [progress, setProgress] = useState(0);
  const [navName, setNavName] = useState("Home");
  const dispatch = useDispatch();
  const coordinates = useSelector(state => state.coordinates);
  var coord = [50.879, 4.6997];
  if (coordinates.lat !== '-') {
    coord = [coordinates.lat, coordinates.lon];
  }

  useEffect(() => {
    if (location.pathname === "/") {
      activate("svg1");
      setNavName("Home");
    } else if (location.pathname === '/pollution') {
      activate("svg2");
      setNavName("Pollution");
    } else if (location.pathname === '/hourlyWeatherData') {
      activate("svg3");
      setNavName("Hourly Weather Data");
    } else if (location.pathname === '/dailyWeatherData') {
      activate("svg4");
      setNavName("Daily Weather Data");
    } else if (location.pathname === '/news') {
      activate("svg5");
      setNavName("News");
    } else if (location.pathname === '/contact') {
      activate("svg6");
      setNavName("Contact");
    } else if (location.pathname === '/about') {
      activate("svg7");
      setNavName("About");
    }

  }, []);
  return (
    <div className="App" data-theme={theme}>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} />
      <div className="bg"></div>
      <div>
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="logo">
              <a href="#" className="nav-link">
                <span className="link-text logo-text">HG Originals</span>
                {icons.hgo}
              </a>
            </li>
            <li className="nav-item" onClick={() => { activate("svg1"); setNavName("Home"); }}>
              <Link className="nav-link" to="/">
                {icons.home}
                <span className="link-text">Home</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg2"); setNavName("Pollution"); }}>
              <Link className="nav-link" to="/pollution">
                {icons.pollution}
                <span className="link-text">Pollution</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg3"); setNavName("Hourly Weather Data"); }}>
              <Link className="nav-link" to="/hourlyWeatherData">
                {icons.hourlyWeather}
                <span style={{ marginLeft: "0.7rem" }} className="link-text">Hourly Weather Data</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg4"); setNavName("Daily Weather Data"); }}>
              <Link className="nav-link" to="/dailyWeatherData">
                {icons.dailyWeather}
                <span style={{ marginLeft: "0.7rem" }} className="link-text">Daily Weather Data</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg5"); setNavName("News"); }}>
              <Link className="nav-link" to="/news">
                {icons.news}
                <span className="link-text">News</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg6"); setNavName("Contact"); }}>
              <Link className="nav-link" to="/contact">
                {icons.contact}
                <span className="link-text">Contact</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { activate("svg7"); setNavName("About"); }}>
              <Link className="nav-link" to="/about">
                {icons.aboutUs}
                <span className="link-text">About</span>
              </Link>
            </li>

            <li className="nav-item" onClick={() => { const newTheme = theme === 'light' ? 'dark' : 'light'; setTheme(newTheme); }}>
              <div className="nav-link">
                {icons.darkMode}
                <span className="link-text">Theme</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="AppDiv">
        <h1 className="App-h1" style={{ borderRadius: "2rem", padding: "1.2rem" }}><span style={{ display: 'block' }}>{icons.hgo}</span>HGO Weather App</h1>
        <h2 className="App-h1" style={{ padding: "0.8rem" }}>{navName}</h2>
        <Search show={!['News', 'Contact', 'About'].includes(navName)} />
        <Routes>
          <Route path="/" element={<Weather />}></Route>
          <Route path="/pollution" element={<Pollution />}></Route>
          <Route path="/hourlyWeatherData" element={<HourlyWeatherData />}></Route>
          <Route path="/dailyWeatherData" element={<DailyWeatherData />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/contact" element={<ContactInfo />}></Route>
        </Routes>
      </div>
      <div id="mapCont" style={{ display: "none", position: "absolute", height: "100%", width: "100%", top: "0%", zIndex: "2" }}>
        <div style={{ height: "100%", position: "fixed", width: "100%", backgroundColor: "#020535", opacity: "0.85" }}>.</div>
        <div style={{ marginTop: "50vh", width: "80%", transform: "translate(-50%,-50%)", marginLeft: "50%" }}>
          <Map height={400} defaultCenter={coord} center={coord} defaultZoom={1} onClick={({ event, latLng, pixel }) => { dispatch(setCoordinates({ lat: latLng[0], lon: latLng[1] })) }}>
            <ZoomControl />
            <Marker id="marker" width={50} anchor={coord} />
          </Map>
          <button className="cartoonButtons CB-close" onClick={() => { hideMap(); }}>Close</button>
          <button className="cartoonButtons CB-getPolluData"
            onClick={() => {
              if (!gettingAddress) {
                getAddressData(coord, dispatch, setProgress);
              }
            }}>Get Pollution Report</button>
        </div>
      </div>
    </div>

  );
}

export default App;
