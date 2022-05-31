
import React,{useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProgress, setData } from "../../actions";
import OtherDetails from "./otherDetails";
import WeatherInfo from "./weatherInfo";
import LoadingBar from 'react-top-loading-bar'

var gettingData=false;

async function getDataFromCoord(dispatch, coordinates,setProgress) {
    try {
        gettingData=true;
        setProgress(10);
        var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=78d818a07aa06aad2c5ca7f24be31e9f`);
        //var res = await fetch("https://api.github.com/users/harshal");
        setProgress(65);
        const data = await res.json()
        setProgress(80);
        dispatch(setData(data));
        setProgress(100);
    } catch (error) {
        setProgress(100);
        alert(`Something Went Wrong :(\n${error}`);
    }finally{
        gettingData=false;
    }
}

const Weather = () => {
    const dispatch = useDispatch();
    const [progress,setProgress]=useState(0);
    const mainData = useSelector(state => state.data);
    const country = useSelector(state => state.country);
    let city = useSelector(state => state.city);
    let cityOrLocality = "City:"
    if (city.includes("--resetCity--")) {
        city = city.slice(13);
        cityOrLocality = "Locality: "
    }
    const coordinates = useSelector(state => state.coordinates);
    var sunrise = "-";
    var sunset = "-";
    if (Object.keys(mainData).length <= 0 && coordinates.lat !== "-" && !gettingData) {
        getDataFromCoord(dispatch, coordinates,setProgress);
    }
    if (mainData && mainData.sys && mainData.sys.sunrise) {
        const riseDate = new Date(mainData.sys.sunrise * 1000);
        const time = (riseDate.getHours()) + ":" + riseDate.getMinutes();
        sunrise = time;
    }

    if (mainData && mainData.sys && mainData.sys.sunset) {
        const riseDate = new Date(mainData.sys.sunset * 1000);
        const time = (riseDate.getHours()) + ":" + riseDate.getMinutes();
        sunset = time;
    }
    const windSpeed = [
        { name: "SPEED", data: mainData.wind && mainData.wind.speed ? mainData.wind.speed : "-", unit: "m/s" },
        { name: "GUST", data: mainData.wind && mainData.wind.gust ? mainData.wind.gust : "-", unit: "m/s" },
        { name: "DEGREE", data: mainData.wind && mainData.wind.deg ? mainData.wind.deg : "-", unit: "deg" },]

    const pressure = [
        { name: "SEA LVL", data: mainData.wind && mainData.wind.sea_level ? mainData.wind.sea_level : "-", unit: "hPa" },
        { name: "GROUND LVL", data: mainData.wind && mainData.wind.grnd_level ? mainData.wind.grnd_level : "-", unit: "hPa" },]

    const clouds = [{ name: "CLOUDINESS", data: mainData.clouds && mainData.clouds.all ? mainData.clouds.all : "-", unit: "%" }]

    return (
        <div className="weather-details-cont">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)} />
            <div className="weather-div">
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%", marginBottom: "1vmax", flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">Country: {country ? country : "-"}</h3>
                    <h3 style={{ fontSize: "0.7rem", marginRight: "0.5rem" }} className="info-p">{cityOrLocality} {city ? city : "-"}</h3>
                </div>
                <div className="weather-temp">
                    <p style={{ marginTop: "23%", color: "white", fontSize: "0.8rem" }} className="info-p">TEMP</p>
                    <h1 className="weather-temp-h1">{mainData.main && mainData.main.temp ? (mainData.main.temp - 273.15).toFixed(1) : "-"}</h1>
                    <p style={{ fontSize: "1rem" }} className="weather-temp-p">&#8451;</p>
                </div>
                <div className="weather-info">
                    <WeatherInfo header="FEELS LIKE" unit="deg" data={mainData.main && mainData.main.feels_like ? (mainData.main.feels_like - 273.15).toFixed(1) : "-"}/>
                    <WeatherInfo header="TEMP MIN" unit="deg" data={mainData.main && mainData.main.temp_min ? (mainData.main.temp_min - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="TEMP MAX" unit="deg" data={mainData.main && mainData.main.temp_max ? (mainData.main.temp_max - 273.15).toFixed(1) : "-"} />
                    <WeatherInfo header="PRESSURE" unit="hPa" data={mainData.main && mainData.main.pressure ? mainData.main.pressure : "-"} />
                    <WeatherInfo header="HUMIDITY" unit="%" data={mainData.main && mainData.main.humidity ? mainData.main.humidity : "-"} />
                </div>
            </div>
            <div className="other-details-cont">
                <OtherDetails header="WIND" elements={windSpeed} />
                <OtherDetails header="PRESSURE" elements={pressure} />
                <OtherDetails header="CLOUDS" elements={clouds} />
                <OtherDetails header="SUN" elements={[{ name: "SUNRISE", data: sunrise, unit: "AM" }, { name: "SUNSET", data: sunset, unit: "PM" }]} />
            </div>
        </div>
    );
}

export default Weather;