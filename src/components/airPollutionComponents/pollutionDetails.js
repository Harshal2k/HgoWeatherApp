import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPollutionData } from "../../actions";
import Pollutants from "./pollutants";
import poor from '../../../src/static/poor.json'
import veryPoor from '../../../src/static/veryPoor.json';
import moderate from '../../../src/static/moderate.json';
import good from '../../../src/static/good.json';
import fair from '../../../src/static/fair.json';
import lottie from 'lottie-web';

async function getPollutionData(coordinates, dispatch) {
    var res = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=78d818a07aa06aad2c5ca7f24be31e9f`)
    var data = await res.json();
    dispatch(setPollutionData(data));
    console.log(data.list[0].main);
    console.log(data)
        ;
}

const Pollution = () => {
    const dispatch = useDispatch();
    var coordinates = useSelector(state => state.coordinates);
    var city = useSelector(state => state.city);
    var country = useSelector(state => state.country);
    var pollutionData = useSelector(state => state.pollutionData);
    console.log(pollutionData);
    if (pollutionData === {}) {
        getPollutionData(coordinates, dispatch);
    }
    const pollutants = {
        "co": 201.94053649902344,
        "no": 0.01877197064459324,
        "no2": 0.7711350917816162,
        "o3": 68.66455078125,
        "so2": 0.6407499313354492,
        "pm2_5": 0.5,
        "pm10": 0.540438711643219,
        "nh3": 0.12369127571582794
    };
    React.useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#earthAnim"),
            animationData: good,
        });
    }, []);

    return (
        <div className="pollutionContainer" style={{width:"100%"}}>
            <div className="addressDetails">
                <p className="info-p addrText"><span className="mkBold">Country:</span> {country ? country : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">City:</span> {city ? city : "-"}</p>
                <p className="info-p addrText"><span className="mkBold">Lat:</span> {coordinates.lat}</p>
                <p className="info-p addrText"><span className="mkBold">Lon:</span> {coordinates.lon}</p>
            </div>
            <div className="airQualityDiv">
                <div id="earthAnim" className="lottieAnim" />
                <div className="airQualityContainer">
                    <p style={{ letterSpacing: "0.3rem" }} className="info-h1">AIR QUALITY</p>
                    <p style={{ margin: "0.6rem" }} className="info-p">Air Quality Index = 1</p>
                    <h1 className="textWithBg" style={{fontSize:"3.1rem", padding:"0.5rem"}}>MODERATE</h1>
                </div>
            </div>
            <Pollutants pollutantsObj={pollutants}/>
        </div>
    );
};

export default Pollution;