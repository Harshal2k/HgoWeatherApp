import React, { useEffect, useState } from "react";
import Search from "./components/search";
import { useSelector, useDispatch } from 'react-redux'
import Weather from "./components/weatherComponents/weather";
import Pollution from "./components/airPollutionComponents/pollutionDetails";
import HourlyWeatherData from "./components/historicWeather/HourlyWeatherData";
import DailyWeatherData from "./components/dailyWeatherData/DailyWeatherData";
import { setProgress, setCoordinates, setCity, setCountry, setPollutants, setPollutionData, setBulkWeatherData, setData, setPopupState } from '../src/actions'
import './App.css';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import icons from "./Asset/SVG/svgIcons";

import LoadingBar from 'react-top-loading-bar'
import News from "./components/newsComponents/news";
import ContactInfo from "./components/contactComponents/ContactInfo";
import About from "./components/aboutComponents/About";
import Popup from "./components/Popup";

function hideMap() {
  document.querySelector("#mapCont").style.display = "none";
  document.querySelector(".AppDiv").style.display = "flex";
  document.querySelector(".App").style.overflow = "auto";
}

function activate(svgId) {
  for (let i = 1; i < 8; i++) {
    document.querySelector(`#svg${i}`).classList.remove("nav-icon-active");
  }
  document.querySelector(`#${svgId}`).classList.add("nav-icon-active");
}

async function getAddressData(coord, dispatch, setProgress) {
  const close = document.querySelector(".red");
  const getPolluData = document.querySelector(".green");
  try {
    close.disabled = true;
    getPolluData.disabled = true;
    setProgress(20);
    const lat = coord[0];
    const lon = coord[1];
    dispatch(setPollutionData({}));
    dispatch(setBulkWeatherData({}));
    dispatch(setData({}));
    dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
    //var res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${process.env.REACT_APP_POINTSTACK_API}&query=${lat},${lon}`);
    var res2 = await fetch(`https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&lat=${lat}&lon=${lon}&format=json`);
    //var res3 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.REACT_APP_WEATHER_API}`);
    setProgress(40)
    //const data = await res.json();
    const data2 = await res2.json();
    // const data3 = await res3.json();
    setProgress(55)
    // if (data?.error) {
    //   throw "error";
    // }
    //var resData = data.data ? data.data : {};
    dispatch(setCountry(data2?.address?.country ? data2?.address?.country : "--"))
    let address = data2?.display_name?.split(',').slice(0, 3);
    //dispatch(setCountry((resData[0]?.country) ? resData[0].country : "--"));
    dispatch(setCity(address && address.length > 0 ? `--resetCity--${String(address)}` : "--"));
    setProgress(75)
    dispatch(setCoordinates({ lat: lat, lon: lon }))
    hideMap();
  } catch (error) {
    dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
    hideMap();
    dispatch(setPopupState({ status: 'show', message: `Something Went Wrong :( ${error}`, type: 'error' }));
  } finally {
    setProgress(100);
    close.disabled = false;
    getPolluData.disabled = false;
  }
}

function App() {
  const location = useLocation();
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [progress, setProgress] = useState(0);
  const [navName, setNavName] = useState("🏠 Home");
  const [tempCoordinates, setTempCoordinates] = useState({ lat: '-', lon: '-' });
  const dispatch = useDispatch();
  const coordinates = useSelector(state => state.coordinates);
  var coord = [22.869775211665768, 78.48530131630628];
  if (tempCoordinates.lat !== '-') {
    coord = [tempCoordinates.lat, tempCoordinates.lon];
  }
  console.log({ tempCoordinates });
  useEffect(() => {
    if (location.pathname === "/") {
      activate("svg1");
      setNavName("🏠 Home");
    } else if (location.pathname === '/pollution') {
      activate("svg2");
      setNavName("🏭 Pollution");
    } else if (location.pathname === '/hourlyWeatherData') {
      activate("svg3");
      setNavName("⏳ Hourly Weather Data");
    } else if (location.pathname === '/dailyWeatherData') {
      activate("svg4");
      setNavName("📆 Daily Weather Data");
    } else if (location.pathname === '/news') {
      activate("svg5");
      setNavName("📻 News");
    } else if (location.pathname === '/contact') {
      activate("svg6");
      setNavName("☎️ Contact");
    } else if (location.pathname === '/about') {
      activate("svg7");
      setNavName("📝 About");
    }

  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.getElementById("body").className = 'body-dark';
    } else {
      document.getElementById("body").className = 'body-light';

    }
  }, [theme]);
  const generateMarkerColor = (coordinates) => {
    let hexValue = "#F4C430"
    if (coordinates?.lat !== "-" && coordinates?.lon !== "-") {
      hexValue = (Number((String(coordinates.lat)).replace("-", "")) + Number((String(coordinates.lon)).replace("-", ""))).toString(16).replace(".", "").substring(0, 6);
      if (hexValue.length < 6) {
        let diff = 6 - hexValue.length;
        hexValue = `#${hexValue}${("0").repeat(diff)}`;
      } else {
        hexValue = `#${hexValue}`;
      }
    }
    return hexValue;
  }

  return (
    <div className="App" data-theme={theme}>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} />
      <div className="bg"></div>
      <Popup />
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <a href="#" className="nav-link">
              <span className="link-text logo-text">HG Originals</span>
              {icons.hgo}
            </a>
          </li>
          <li className="nav-item" onClick={() => { activate("svg1"); setNavName("🏠 Home"); }}>
            <Link className="nav-link" to="/">
              {icons.home}
              <span className="link-text">Home</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg2"); setNavName("🏭 Pollution"); }}>
            <Link className="nav-link" to="/pollution">
              {icons.pollution}
              <span className="link-text">Pollution</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg3"); setNavName("⏳ Hourly Weather Data"); }}>
            <Link className="nav-link" to="/hourlyWeatherData">
              {icons.hourlyWeather}
              <span style={{ marginLeft: "0.7rem" }} className="link-text">Hourly Weather Data</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg4"); setNavName("📆 Daily Weather Data"); }}>
            <Link className="nav-link" to="/dailyWeatherData">
              {icons.dailyWeather}
              <span style={{ marginLeft: "0.7rem" }} className="link-text">Daily Weather Data</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg5"); setNavName("📻 News"); }}>
            <Link className="nav-link" to="/news">
              {icons.news}
              <span className="link-text">News</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg6"); setNavName("☎️ Contact"); }}>
            <Link className="nav-link" to="/contact">
              {icons.contact}
              <span className="link-text">Contact</span>
            </Link>
          </li>

          <li className="nav-item" onClick={() => { activate("svg7"); setNavName("📝 About"); }}>
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
      <div className="AppDiv">
        <h1 className="App-h1" style={{ borderRadius: "2rem", padding: "1.2rem" }}><span style={{ display: 'block' }}>{icons.hgo}</span>HGO Weather App</h1>
        <h2 id="abc" className="App-h1" style={{ padding: "0.8rem" }}>{navName}</h2>
        <Search show={!['📻 News', '☎️ Contact', '📝 About'].includes(navName)} />
        <Routes>
          <Route path="/" element={<Weather />}></Route>
          <Route path="/pollution" element={<Pollution />}></Route>
          <Route path="/hourlyWeatherData" element={<HourlyWeatherData />}></Route>
          <Route path="/dailyWeatherData" element={<DailyWeatherData />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/contact" element={<ContactInfo />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </div>
      <div id="mapCont" style={{ display: "none", position: "absolute", height: "100%", width: "100%", top: "0%", zIndex: "2" }}>
        <div style={{ height: "100%", position: "fixed", width: "100%", backgroundColor: generateMarkerColor(tempCoordinates), opacity: "0.85", transition: "background-color 600ms ease" }}>.</div>
        <div id="mapDiv" style={{ marginTop: "50vh", width: "90%", transform: "translate(-50%,-50%)", marginLeft: "50%" }}>
          <Map boxClassname="mapBox" zoomSnap={false} height={600} defaultCenter={coord} center={coord} defaultZoom={3.8} onClick={({ event, latLng, pixel }) => { setTempCoordinates({ lat: latLng[0], lon: latLng[1] }) }}>
            <ZoomControl />
            <Marker id="marker" width={50} anchor={coord} color={generateMarkerColor(tempCoordinates)} />
          </Map>
          <button className="action-button shadow animate red" onClick={() => { hideMap(); }}>Close</button>
          <button className="action-button shadow animate green"
            onClick={async () => {
              await getAddressData(coord, dispatch, setProgress);
            }}>Get Details</button>
        </div>
      </div>
      <footer>
        {icons.hgo}
        {/* <p style={{ color: "var(--nav-text)", fontSize: "1rem" }} className="info-p">HARSHAL GOSAWI</p>
        <p style={{ letterSpacing: "0.6rem" }} className="info-p">ORIGINALS</p> */}
      </footer>
    </div>

  );
}

export default App;
