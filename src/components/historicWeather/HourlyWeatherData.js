import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, setBulkWeatherData } from "../../actions";
import WeatherInfo from "../weatherComponents/weatherInfo";

import moment from "moment";
import LoadingBar from "react-top-loading-bar";
import icons from "../../Asset/SVG/svgIcons";

var gettingHourlyData = false;
var date = "-";
var progs = 0;
async function getDataFromCoord(dispatch, coordinates, setDisplayData) {
    try {
        gettingHourlyData = true
        setProgress(0);
        var res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&appid=78d818a07aa06aad2c5ca7f24be31e9f`);
        setProgress(65);
        const data = await res.json()
        setProgress(80);
        dispatch(setBulkWeatherData(data));
        setProgress(100);
        setDisplayData({ index: 0, length: 0, data: { empty: true } });
    } catch (error) {
        setProgress(100);
        alert(`Something Went Wrong :(\n${error}`);
    } finally {
        gettingHourlyData = false;
    }
}

function change(data, index, setDisplayData, isUp) {
    if (isUp) {
        index = index + 1;
    } else {
        index = index - 1;
    }
    console.log(index);

    if (data[index]) {
        setDisplayData({ index: index, length: data.length, data: data[index] })
        document.querySelector("#dateText").innerHTML = moment.unix(data[index].dt).format("lll");
    }
}

function renderRainAndSnow(data) {
    var toRender = []
    if (data.rain && ("1h" in data.rain)) {
        toRender.push({ title: "RAIN VOLUME (1Hr)", value: data.rain["1h"] })
    }
    if (data.snow && ("1h" in data.snow)) {
        toRender.push({ title: "SNOW VOLUME (1Hr)", value: data.snow["1h"] })
    }
    return (
        <>
            {toRender.map(elem =>
                <WeatherInfo header={elem.title} unit="mm" data={elem.value} />
            )}
        </>
    );

}

const HourlyWeatherData = () => {
    const dispatch = useDispatch();
    const hWeatherData = useSelector(state => state.bulkWeather);
    const [displayData, setDisplayData] = useState({ index: 0, length: 0, data: { empty: true } });
    const [progress, setProgress] = useState(0);
    const country = useSelector(state => state.country);
    let city = useSelector(state => state.city);
    let cityOrLocality = "City:"
    if (city.includes("--resetCity--")) {
        city = city.slice(13);
        cityOrLocality = "Locality: "
    }

    const coordinates = useSelector(state => state.coordinates);

    if (!gettingHourlyData && hWeatherData && Object.keys(hWeatherData).length <= 0 && coordinates.lat !== '-') {
        getDataFromCoord(dispatch, coordinates, setDisplayData);
    }

    if (!gettingHourlyData && displayData.data.empty && hWeatherData.hourly && hWeatherData.hourly.length > 0 && coordinates.lat !== '-') {
        setDisplayData({ index: 0, length: hWeatherData.hourly.length, data: hWeatherData.hourly[0] })
    }

    if (displayData.length > 0) {
        date = moment.unix(displayData.data.dt).format("lll");
    }

    return (
        <div className="weather-details-cont">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)} />
            <div style={{ marginTop: "2rem" }} className="pollutionContainer neumorphismEffect">
                <p className="info-p">Hourly data is displayed for the below date time</p>
                <div style={{ marginTop: "1rem", flexDirection: "row" }} className="pollutionContainer">
                    <button disabled={displayData.length === 0 || displayData.index === 0 ? true : false} id="down" onClick={() => change(hWeatherData.hourly, displayData.index, setDisplayData, false)} style={{ height: "4rem", width: "3rem", marginRight: "0.7rem" }} className="searchDiv-button">{icons.downArrow}</button>
                    <h1 id="dateText" style={{ width: "13rem" }} className="info-h1">{date}</h1>
                    <button disabled={displayData.length === 0 || displayData.index >= displayData.length - 1 ? true : false} id="up" onClick={() => change(hWeatherData.hourly, displayData.index, setDisplayData, true)} style={{ height: "4rem", width: "3rem", marginLeft: "0.7rem" }} className="searchDiv-button">{icons.upArrow}</button>
                </div>
            </div>

            <div className="weather-div">
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginBottom: "1vmax", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">Country: {country ? country : "-"}</h3>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">{cityOrLocality} {city ? city : "-"}</h3>
                </div>
                <div className="weather-temp">
                    <p style={{ marginTop: "23%", color: "white", fontSize: "0.8rem" }} className="info-p">TEMP</p>
                    <h1 className="weather-temp-h1">{displayData.data && displayData.data.temp ? (displayData.data.temp - 273.15).toFixed(1) : "-"}</h1>
                    <p style={{ fontSize: "1rem" }} className="weather-temp-p">&#8451;</p>
                </div>
                <div className="weather-info">
                    <WeatherInfo header="FEELS LIKE" unit="deg" data={displayData.data && displayData.data.feels_like ? (displayData.data.feels_like - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="PRESSURE" unit="hPa" data={displayData.data && displayData.data.pressure ? displayData.data.pressure : "-"} />
                    <WeatherInfo header="HUMIDITY" unit="%" data={displayData.data && displayData.data.humidity ? displayData.data.humidity : "-"} />
                    <WeatherInfo header="DEW POINT" unit="deg" data={displayData.data && displayData.data.dew_point ? displayData.data.dew_point : "-"} />
                    <WeatherInfo header="UVI" unit="%" data={displayData.data && displayData.data.uvi ? displayData.data.uvi : "-"} />
                    <WeatherInfo header="CLOUDS" unit="%" data={displayData.data && displayData.data.clouds ? displayData.data.clouds : "-"} />
                    <WeatherInfo header="VISIBILITY" unit="m" data={displayData.data && displayData.data.visibility ? displayData.data.visibility : "-"} />
                    <WeatherInfo header="WIND SPEED" unit="m/s" data={displayData.data && displayData.data.wind_speed ? displayData.data.wind_speed : "-"} />
                    <WeatherInfo header="WIND DEGREE" unit="deg" data={displayData.data && displayData.data.wind_deg ? displayData.data.wind_deg : "-"} />
                    <WeatherInfo header="WIND GUST" unit="m/s" data={displayData.data && displayData.data.wind_gust ? displayData.data.wind_gust : "-"} />
                    {renderRainAndSnow(displayData.data)}
                </div>
            </div>
        </div>
    );
}

export default HourlyWeatherData;