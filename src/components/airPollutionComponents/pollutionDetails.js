import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPollutionData, setPollutants, setCoordinates } from "../../actions";
import Pollutants from "./pollutants";
import poor from '../../../src/static/poor.json'
import veryPoor from '../../../src/static/veryPoor.json';
import moderate from '../../../src/static/moderate.json';
import good from '../../../src/static/good.json';
import fair from '../../../src/static/fair.json';
import lottie from 'lottie-web';
import moment from 'moment'

var fetchStarted = false;
var aqiComment = "-";
var emote = good;
var isEmoteChanged = false;
var date="-";
var pollutionListLength=0;
async function getPollutionData(coordinates, dispatch) {
    try {
        if (!fetchStarted && coordinates.lat !== "-" && coordinates.lon !== "-") {
            fetchStarted = true;
            console.log("fetching pollution")
            var res = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=78d818a07aa06aad2c5ca7f24be31e9f`);
            var data = await res.json();
            dispatch(setPollutionData(data));
            fetchStarted = false;
        }
    } catch (err) {
        dispatch(setPollutionData({}));
        fetchStarted = false;
    }

}

function change(data,index,dispatch,isUp){
    if(isUp){
        index=index+1;
    }else{
        index=index-1;
    }
    console.log(index);

    if ("components" in data.list[index]) {
        dispatch(setPollutants({index:index,component:data.list[index].components,aqi:data.list[index].main.aqi}));
        document.querySelector("#dateText").innerHTML=moment.unix(data.list[index].dt).format("lll");

    }
}

const Pollution = () => {
    const dispatch = useDispatch();
    let coordinates = useSelector(state => state.coordinates);
    let city = useSelector(state => state.city);
    let country = useSelector(state => state.country);
    let cityOrLocality="City:"
    if(city.includes("--resetCity--")){
        city=city.slice(13);
        cityOrLocality="Locality: "
    }
    console.log(coordinates==={lat:"-",lon:"-"}?true:false);
    if(country==='' && city!=='' && coordinates.lat==="-"){
        alert("Please locate your city on the map");
        dispatch(setCoordinates({lat:0,lon:0}))
    }
    let pollutionData = useSelector(state => state.pollutionData);
    const pollutantsData=useSelector(state=>state.pollutants);
    let pollutantsIndex=pollutantsData.index;
    let pollutants=pollutantsData.component;
    let AQI = pollutantsData.aqi;
    console.log(pollutants);
    const polluntantsLen=Object.keys(pollutants).length;
    if (Object.keys(pollutionData).length === 0) {
        getPollutionData(coordinates, dispatch);
    }
    if (pollutionData && pollutionData.list && pollutionData.list.length > 0) {
        if(Object.keys(pollutants).length===0){
            dispatch(setPollutants({index:0,component:pollutionData.list[0].components,aqi:pollutionData.list[0].main.aqi}));
            pollutantsIndex=0;
            pollutants=pollutionData.list[0].components;
            AQI=pollutionData.list[0].main.aqi;
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
        pollutionListLength=pollutionData.list.length;
        date=moment.unix(pollutionData.list[pollutantsIndex].dt).format("lll");
    }
    React.useEffect(() => {
        var animation = lottie.loadAnimation({
            container: document.querySelector("#earthAnim"),
            animationData: emote,
        });
        if (isEmoteChanged) {
            animation.destroy();
            animation = lottie.loadAnimation({
                container: document.querySelector("#earthAnim"),
                animationData: emote,
            });
            isEmoteChanged = false;
        }

    }, [emote]);

    return (
        <div className="pollutionContainer" style={{ width: "100%" }}>
            <div className="addressDetails">
                <p className="info-p addrText"><span className="mkBold">Country:</span> {country ? country : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">{cityOrLocality}</span> {city ? city : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">Lat:</span> {coordinates.lat}</p>
                <p className="info-p addrText"><span className="mkBold">Lon:</span> {coordinates.lon}</p>
            </div>
            <div className="airQualityDiv">
                <div id="earthAnim" className="lottieAnim" />
                <div className="airQualityContainer">
                    <p style={{ letterSpacing: "0.3rem" }} className="info-h1">AIR QUALITY</p>
                    <p style={{ margin: "0.6rem" }} className="info-p">Air Quality Index = {AQI}</p>
                    <h1 className="textWithBg" style={{ fontSize: "3.1rem", padding: "0.5rem" }}>{aqiComment}</h1>
                </div>
            </div>
            <div style={{ marginTop: "2rem" }} className="pollutionContainer neumorphismEffect">
                <p className="info-p">Pollution data is displayed for the below date time</p>
                <div style={{marginTop:"1rem", flexDirection: "row" }} className="pollutionContainer">
                    <button disabled={polluntantsLen===0 || pollutantsIndex ===0?true:false} id="down" onClick={()=>change(pollutionData,pollutantsIndex,dispatch,false)} style={{ height: "4rem", width: "3rem", marginRight:"0.7rem" }} className="searchDiv-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e64925" d="M169.4 278.6C175.6 284.9 183.8 288 192 288s16.38-3.125 22.62-9.375l160-160c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0L192 210.8L54.63 73.38c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L169.4 278.6zM329.4 265.4L192 402.8L54.63 265.4c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25l160 160C175.6 476.9 183.8 480 192 480s16.38-3.125 22.62-9.375l160-160c12.5-12.5 12.5-32.75 0-45.25S341.9 252.9 329.4 265.4z" /></svg></button>
                    <h1 id="dateText" style={{width:"16rem"}} className="info-h1">{date}</h1>
                    <button disabled={polluntantsLen===0 || pollutantsIndex>=pollutionData.list.length-1?true:false} id="up" onClick={()=>change(pollutionData,pollutantsIndex,dispatch,true)}  style={{ height: "4rem", width: "3rem", marginLeft:"0.7rem" }} className="searchDiv-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#0eb00e" d="M54.63 246.6L192 109.3l137.4 137.4C335.6 252.9 343.8 256 352 256s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25l-160-160c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25S42.13 259.1 54.63 246.6zM214.6 233.4c-12.5-12.5-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0L192 301.3l137.4 137.4C335.6 444.9 343.8 448 352 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L214.6 233.4z" /></svg></button>
                </div>
            </div>
            <Pollutants pollutantsObj={pollutants} />
        </div>
    );
};

export default Pollution;