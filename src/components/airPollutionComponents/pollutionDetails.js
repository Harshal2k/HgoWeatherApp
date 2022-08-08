import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPollutionData, setPollutants, setCoordinates, setProgress, setPopupState } from "../../actions";
import Pollutants from "./pollutants";
import poor from '../../../src/static/poor.json'
import veryPoor from '../../../src/static/veryPoor.json';
import moderate from '../../../src/static/moderate.json';
import good from '../../../src/static/good.json';
import fair from '../../../src/static/fair.json';
import lottie from 'lottie-web';
import moment from 'moment'
import LoadingBar from "react-top-loading-bar";
import icons from "../../Asset/SVG/svgIcons";

var aqiComment = "-";
var emote = good;
var isEmoteChanged = false;
var date = "-";
var pollutionListLength = 0;
var prevCoordinates = { lat: 0, lon: 0 };

const Pollution = () => {
    const dispatch = useDispatch();
    let coordinates = useSelector(state => state.coordinates);
    const [progress, setProgress] = useState(0);
    let city = useSelector(state => state.city);
    let country = useSelector(state => state.country);
    let cityOrLocality = "City:"
    if (city.includes("--resetCity--")) {
        city = city.slice(13);
        cityOrLocality = "Locality: "
    }
    if (country === '' && city !== '' && coordinates.lat === "-") {
        dispatch(setPopupState({ status: 'show', message: "Please locate your city on the map", type: 'error' }));
        dispatch(setCoordinates({ lat: 0, lon: 0 }))
    }
    let pollutionData = useSelector(state => state.pollutionData);
    const pollutantsData = useSelector(state => state.pollutants);
    let pollutantsIndex = pollutantsData.index;
    let pollutants = pollutantsData.component;
    let AQI = pollutantsData.aqi;
    const polluntantsLen = Object.keys(pollutants).length;
    useEffect(() => {
        getPollutionData(coordinates, dispatch, setProgress);
    }, [coordinates]);
    if (pollutionData && pollutionData.list && pollutionData.list.length > 0) {
        if (Object.keys(pollutants).length === 0) {
            dispatch(setPollutants({ index: 0, component: pollutionData.list[0].components, aqi: pollutionData.list[0].main.aqi }));
            pollutantsIndex = 0;
            pollutants = pollutionData.list[0].components;
            AQI = pollutionData.list[0].main.aqi;
        }
        //AQI = pollutionData.list[0].main.aqi;
        if (AQI === 1) {
            aqiComment = "Good";
            emote = good;
        } else if (AQI === 2) {
            aqiComment = "Fair";
            emote = fair;
        } else if (AQI === 3) {
            aqiComment = "Moderate";
            emote = moderate;
        } else if (AQI === 4) {
            aqiComment = "Poor";
            emote = poor;
        } else if (AQI === 5) {
            aqiComment = "Very Poor";
            emote = veryPoor;
        } else {
            aqiComment = "-";
            emote = good;
        }
        isEmoteChanged = true;
        pollutionListLength = pollutionData.list.length;
        date = moment.unix(pollutionData.list[pollutantsIndex].dt).format("lll");
    }
    React.useEffect(() => {
        var animation = lottie.loadAnimation({
            container: document.querySelector(".lottieAnim"),
            animationData: emote,
        });
        if (isEmoteChanged) {
            animation.destroy();
            animation = lottie.loadAnimation({
                container: document.querySelector(".lottieAnim"),
                animationData: emote,
            });
            isEmoteChanged = false;
        }

    }, [emote]);

    return (
        <div className="pollutionContainer">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)} />
            <div className="addressDetails">
                <p className="info-p addrText"><span className="mkBold">Country:</span> {country ? country : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">{cityOrLocality}</span> {city ? city : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">Lat:</span> {coordinates.lat}</p>
                <p className="info-p addrText"><span className="mkBold">Lon:</span> {coordinates.lon}</p>
            </div>
            <div className="airQualityDiv">
                <div className="lottieAnim" />
                <div className="airQualityContainer">
                    <p style={{ letterSpacing: "0.3rem" }} className="info-h1">AIR QUALITY</p>
                    <p style={{ margin: "0.6rem" }} className="info-p">Air Quality Index = {AQI}</p>
                    <h1 className="textWithBg" style={{ fontSize: "3.1rem", padding: "0.5rem" }}>{aqiComment}</h1>
                </div>
            </div>
            <div style={{ marginTop: "2rem" }} className="pollutionContainer neumorphismEffect">
                <p className="info-p">Pollution data is displayed for the below date time</p>
                <div style={{ marginTop: "1rem", flexDirection: "row" }} className="pollutionContainer">
                    <button disabled={polluntantsLen === 0 || pollutantsIndex === 0 ? true : false} id="down" onClick={() => change(pollutionData, pollutantsIndex, dispatch, false)} style={{ height: "4rem", width: "3rem", marginRight: "0.7rem" }} className="searchDiv-button">{icons.downArrow}</button>
                    <h1 id="dateText" style={{ width: "13rem" }} className="info-h1">{date}</h1>
                    <button disabled={polluntantsLen === 0 || pollutantsIndex >= pollutionData.list.length - 1 ? true : false} id="up" onClick={() => change(pollutionData, pollutantsIndex, dispatch, true)} style={{ height: "4rem", width: "3rem", marginLeft: "0.7rem" }} className="searchDiv-button">{icons.upArrow}</button>
                </div>
            </div>
            <Pollutants pollutantsObj={pollutants} />
        </div>
    );
};

async function getPollutionData(coordinates, dispatch, setProgress) {
    try {
        if (coordinates.lat !== "-" && coordinates.lon !== '-' && prevCoordinates.lat != coordinates.lat && prevCoordinates.lon != coordinates.lon) {
            prevCoordinates.lat = coordinates.lat;
            prevCoordinates.lon = coordinates.lon;
            setProgress(0);
            var res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_WEATHER_API}`);
            setProgress(65);
            var data = await res.json();
            dispatch(setPollutionData(data));
            dispatch(setPopupState({ status: 'show', message: 'Successfully fetched data', type: 'success' }));
            setProgress(80);
            setProgress(100);
        }
    } catch (err) {
        setProgress(100);
        dispatch(setPollutionData({}));
        dispatch(setPopupState({ status: 'show', message: `Something Went Wrong :( ${err}`, type: 'error' }));
    }

}



function change(data, index, dispatch, isUp) {
    if (isUp) {
        index = index + 1;
    } else {
        index = index - 1;
    }

    if ("components" in data.list[index]) {
        dispatch(setPollutants({ index: index, component: data.list[index].components, aqi: data.list[index].main.aqi }));
        document.querySelector("#dateText").innerHTML = moment.unix(data.list[index].dt).format("lll");

    }
}


export default Pollution;