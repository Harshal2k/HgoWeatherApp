import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, setBulkWeatherData } from "../../actions";
import WeatherInfo from "../weatherComponents/weatherInfo";

import moment from "moment";

var gettingDailyData = false;
var date = "-";
async function getDataFromCoord(dispatch, coordinates, setDisplayData) {
    try {
        gettingDailyData = true
        //dispatch(setProgress(10));
        console.log("gettingDailyData");
        var res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&appid=78d818a07aa06aad2c5ca7f24be31e9f`);
        //var res = await fetch("https://api.github.com/users/harshal");
        //dispatch(setProgress(65));
        const data = await res.json()
        console.log(data);
        //dispatch(setProgress(80));
        dispatch(setBulkWeatherData(data));
        setDisplayData({ index: 0, length: 0, data: { empty: true } });
        //dispatch(setProgress(100));
    } catch (error) {
        dispatch(setProgress(100));
        alert(`Something Went Wrong :(\n${error}`);
    } finally {
        gettingDailyData = false;
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
        //dispatch(setPollutants({index:index,component:data.list[index].components,aqi:data.list[index].main.aqi}));
        setDisplayData({ index: index, length: data.length, data: data[index] })
        document.querySelector("#dateText").innerHTML = moment.unix(data[index].dt).format("lll");
    }
}

function renderRainAndSnow(data) {
    var toRender = []
    if (data.rain) {
        toRender.push({ title: "Rain Volume", value: data.rain })
    }
    if (data.snow) {
        toRender.push({ title: "Snow Volume", value: data.snow })
    }
    return (
        <>
            {toRender.map(elem =>
                <WeatherInfo header={elem.title} unit="mm" data={elem.value} />
            )}
        </>
    );
}

function sunMoonRiseSet(data) {
    let timings = [];
    if (data.sunrise) {
        const timeArr = moment.unix(data.sunrise).format("LT").split(" ");
        timings.push({ title: "Sunrise", time: timeArr[0], amPm: timeArr[1] });
    }

    if (data.sunset) {
        const timeArr = moment.unix(data.sunset).format("LT").split(" ");
        timings.push({ title: "Sunset", time: timeArr[0], amPm: timeArr[1] });
    }

    if (data.moonrise) {
        const timeArr = moment.unix(data.moonrise).format("LT").split(" ");
        timings.push({ title: "Moonrise", time: timeArr[0], amPm: timeArr[1] });
    }

    if (data.moonset) {
        const timeArr = moment.unix(data.moonset).format("LT").split(" ");
        timings.push({ title: "Moonset", time: timeArr[0], amPm: timeArr[1] });
    }

    if (data.moon_phase) {
        let phaseName = ""
        if (data.moon_phase === 0 || data.moon_phase === 1) {
            phaseName = "New Moon";
        } else if (data.moon_phase === 0.25) {
            phaseName = "First Quater Moon";
        } else if (data.moon_phase === 0.5) {
            phaseName = "Full Moon";
        } else if (data.moon_phase === 0.75) {
            phaseName = "Last Quater Moon";
        } else if (data.moon_phase > 0 && data.moon_phase < 0.25) {
            phaseName = "Waxing Crescent";
        } else if (data.moon_phase > 0.25 && data.moon_phase < 0.5) {
            phaseName = "Waxing Gibous";
        } else if (data.moon_phase > 0.5 && data.moon_phase < 0.75) {
            phaseName = "Waning Gibous";
        } else if (data.moon_phase > 0.75 && data.moon_phase < 1) {
            phaseName = "Waning Crescent";
        }
        timings.push({ title: "Moon Phase", time: data.moon_phase, amPm: phaseName });
    }


    return (
        <div className="pollutionContainer neumorphismEffect" style={{ maxWidth: "90%", marginTop: "2.5rem", marginBottom: "2.5rem" }}>
            <h1 className="info-h1">Sun / Moon Rise and Set Timings</h1>
            <div className="pollutionContainer" style={{ flexDirection: "unset", marginTop: "0.7rem" }}>
                {timings.map((elem) =>
                    <div className="neumorphismEffect" style={{ width: "9rem", margin: "0.5rem", height: "9rem" }}>
                        <p className="info-p" style={{ height: "1.8rem" }}>{elem.title}</p>
                        <h1 className="textWithBg" style={{ fontSize: "2rem", marginTop: "0.2rem" }}>{elem.time}</h1>
                        <p style={{ fontSize: "1rem" }} className="info-p">{elem.amPm}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const DailyWeatherData = () => {
    const dispatch = useDispatch();
    const hWeatherData = useSelector(state => state.bulkWeather);
    const [displayData, setDisplayData] = useState({ index: 0, length: 0, data: { empty: true } });
    const country = useSelector(state => state.country);
    let city = useSelector(state => state.city);
    let cityOrLocality = "City:"
    if (city.includes("--resetCity--")) {
        city = city.slice(13);
        cityOrLocality = "Locality: "
    }

    console.log(displayData)
    console.log(displayData.index)
    const coordinates = useSelector(state => state.coordinates);

    if (!gettingDailyData && hWeatherData && Object.keys(hWeatherData).length <= 0) {
        getDataFromCoord(dispatch, coordinates, setDisplayData);
    }

    if (displayData.data.empty && hWeatherData.daily && hWeatherData.daily.length > 0 && coordinates.lat !== '-') {
        setDisplayData({ index: 0, length: hWeatherData.daily.length, data: hWeatherData.daily[0] })
    }

    if (displayData.length > 0) {
        date = moment.unix(displayData.data.dt).format("lll");
    }

    return (
        <div className="weather-details-cont">
            <div style={{ marginTop: "2rem" }} className="pollutionContainer neumorphismEffect">
                <p className="info-p">daily data is displayed for the below date time</p>
                <div style={{ marginTop: "1rem", flexDirection: "row" }} className="pollutionContainer">
                    <button disabled={displayData.length === 0 || displayData.index === 0 ? true : false} id="down" onClick={() => change(hWeatherData.daily, displayData.index, setDisplayData, false)} style={{ height: "4rem", width: "3rem", marginRight: "0.7rem" }} className="searchDiv-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e64925" d="M169.4 278.6C175.6 284.9 183.8 288 192 288s16.38-3.125 22.62-9.375l160-160c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L192 210.8L54.63 73.38c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L169.4 278.6zM329.4 265.4L192 402.8L54.63 265.4c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25l160 160C175.6 476.9 183.8 480 192 480s16.38-3.125 22.62-9.375l160-160c12.5-12.5 12.5-32.75 0-45.25S341.9 252.9 329.4 265.4z" /></svg></button>
                    <h1 id="dateText" style={{ width: "16rem" }} className="info-h1">{date}</h1>
                    <button disabled={displayData.length === 0 || displayData.index >= displayData.length - 1 ? true : false} id="up" onClick={() => change(hWeatherData.daily, displayData.index, setDisplayData, true)} style={{ height: "4rem", width: "3rem", marginLeft: "0.7rem" }} className="searchDiv-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#0eb00e" d="M54.63 246.6L192 109.3l137.4 137.4C335.6 252.9 343.8 256 352 256s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25l-160-160c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25S42.13 259.1 54.63 246.6zM214.6 233.4c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0L192 301.3l137.4 137.4C335.6 444.9 343.8 448 352 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L214.6 233.4z" /></svg></button>
                </div>
            </div>

            <div className="weather-div">
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginBottom: "1vmax", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">Country: {country ? country : "-"}</h3>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">{cityOrLocality} {city ? city : "-"}</h3>
                </div>
                <div className="weather-temp">
                    <p style={{ marginTop: "23%", color: "white", fontSize: "0.8rem" }} className="info-p">TEMP</p>
                    <h1 className="weather-temp-h1">{displayData.data && displayData.data.temp ? (((displayData.data.temp.min + displayData.data.temp.max) / 2) - 273.15).toFixed(1) : "-"}</h1>
                    <p style={{ fontSize: "1rem" }} className="weather-temp-p">&#8451;</p>
                </div>
                <div className="weather-info">
                    <WeatherInfo header="TEMP MAX" unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.max ? (displayData.data.temp.max - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP MIN" unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.min ? (displayData.data.temp.min - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP DAY" unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.day ? (displayData.data.temp.day - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP NIGHT" unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.night ? (displayData.data.temp.night - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP MORN." unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.morn ? (displayData.data.temp.morn - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP EVE." unit="deg" data={displayData.data && displayData.data.temp && displayData.data.temp.eve ? (displayData.data.temp.eve - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="FEELS LIKE DAY" unit="deg" data={displayData.data && displayData.data.feels_like && displayData.data.feels_like.day ? (displayData.data.feels_like.day - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="FEELS LIKE NIGHT" unit="deg" data={displayData.data && displayData.data.feels_like && displayData.data.feels_like.night ? (displayData.data.feels_like.night - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="FEELS LIKE MORN." unit="deg" data={displayData.data && displayData.data.feels_like && displayData.data.feels_like.morn ? (displayData.data.feels_like.morn - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="FEELS LIKE EVE." unit="deg" data={displayData.data && displayData.data.feels_like && displayData.data.feels_like.eve ? (displayData.data.feels_like.eve - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="PRESSURE" unit="hPa" data={displayData.data && displayData.data.pressure ? displayData.data.pressure : "-"} />
                    <WeatherInfo header="HUMIDITY" unit="%" data={displayData.data && displayData.data.humidity ? displayData.data.humidity : "-"} />
                    <WeatherInfo header="DEW POINT" unit="deg" data={displayData.data && displayData.data.dew_point ? displayData.data.dew_point : "-"} />
                    <WeatherInfo header="UVI" unit="%" data={displayData.data && displayData.data.uvi ? displayData.data.uvi : "-"} />
                    <WeatherInfo header="CLOUDS" unit="%" data={displayData.data && displayData.data.clouds ? displayData.data.clouds : "-"} />
                    <WeatherInfo header="WIND SPEED" unit="m/s" data={displayData.data && displayData.data.wind_speed ? displayData.data.wind_speed : "-"} />
                    <WeatherInfo header="WIND DEGREE" unit="deg" data={displayData.data && displayData.data.wind_deg ? displayData.data.wind_deg : "-"} />
                    <WeatherInfo header="WIND GUST" unit="m/s" data={displayData.data && displayData.data.wind_gust ? displayData.data.wind_gust : "-"} />
                    {renderRainAndSnow(displayData.data)}
                </div>
            </div>
            {sunMoonRiseSet(displayData.data)}
        </div>
    );
}

export default DailyWeatherData;