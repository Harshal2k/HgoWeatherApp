import React from "react";
// import lottie from "lottie-web";
// import windmill from './static/windmill.json'



export default class Weather extends React.Component {
    render() {
        const windStyle = {
            color: "#444",
            fontSize: "1.8vmax",
            fontFamily: "Cabin",
            letterSpacing: "0.5vmax",
            fontWeight: "400"
        };
        const mainData = this.props.data ? this.props.data : {};
        var sunrise="-";
        var sunset="-";
        if(mainData && mainData.sys && mainData.sys.sunrise){
            const riseDate=new Date(mainData.sys.sunrise*1000);
            const time=(riseDate.getHours())+":"+riseDate.getMinutes();
            console.log("time1: ",time);
            sunrise=time;
        }

        if(mainData && mainData.sys && mainData.sys.sunset){
            const riseDate=new Date(mainData.sys.sunset*1000);
            const time=(riseDate.getHours())+":"+riseDate.getMinutes();
            console.log("time2: ",time);
            sunset=time;
        }
        console.log("mainData", mainData.pressure);
        return (
            <div className="weather-details-cont">
                <div className="weather-div">
                    <div className="weather-temp">
                        <p style={{ marginTop: "23%", color: "white", fontSize: "1vmax" }} className="weather-info-p">TEMP</p>
                        <h1 className="weather-temp-h1">{mainData.main && mainData.main.temp ? (mainData.main.temp - 273.15).toFixed(1) : "-"}</h1>
                        <p style={{ fontSize: "1vmax" }} className="weather-temp-p">&#8451;</p>
                    </div>
                    <div className="weather-info">
                        <div className="weather-info-div">
                            <p className="weather-info-p">FEELS LIKE</p>
                            <h1 className="weather-info-h1">{mainData.main && mainData.main.feels_like ? (mainData.main.feels_like - 273.15).toFixed(1) : "-"}</h1>
                            <p className="weather-info-p">&#8451;</p>
                        </div>
                        <div className="weather-info-div">
                            <p className="weather-info-p">MIN TEMP</p>
                            <h1 className="weather-info-h1">{mainData.main && mainData.main.temp_min ? (mainData.main.temp_min - 273.15).toFixed(1) : "-"}</h1>
                            <p className="weather-info-p">&#8451;</p>
                        </div>
                        <div className="weather-info-div">
                            <p className="weather-info-p">MAX TEMP</p>
                            <h1 className="weather-info-h1">{mainData.main && mainData.main.temp_max ? (mainData.main.temp_max - 273.15).toFixed(1) : "-"}</h1>
                            <p className="weather-info-p">&#8451;</p>
                        </div>
                        <div className="weather-info-div">
                            <p className="weather-info-p">PRESSURE</p>
                            <h1 className="weather-info-h1">{mainData.main && mainData.main.pressure ? mainData.main.pressure : "-"}</h1>
                            <p className="weather-info-p">hPa</p>
                        </div>
                        <div className="weather-info-div">
                            <p className="weather-info-p">HUMIDITY</p>
                            <h1 className="weather-info-h1">{mainData.main && mainData.main.humidity ? mainData.main.humidity : "-"}</h1>
                            <p className="weather-info-p">%</p>
                        </div>
                    </div>
                </div>
                <div className="other-details-cont">
                    <div className="OD-div">
                        <h1 style={windStyle}>WIND</h1>
                        <div className="OD-info">
                            <div className="ODI-div">
                                <p className="weather-info-p">SPEED</p>
                                <h1 className="weather-info-h1">{mainData.wind && mainData.wind.speed ? mainData.wind.speed : "-"} m/s</h1>
                            </div>
                            <div className="ODI-div">
                                <p className="weather-info-p">GUST</p>
                                <h1 className="weather-info-h1">{mainData.wind && mainData.wind.gust ? mainData.wind.gust : "-"} m/s</h1>
                            </div>
                            <div className="ODI-div">
                                <p className="weather-info-p">DEGREE</p>
                                <h1 className="weather-info-h1">{mainData.wind && mainData.wind.deg ? mainData.wind.deg : "-"} &deg;</h1>
                            </div>
                        </div>
                    </div>
                    <div className="OD-div">
                        <h1 style={windStyle}>PRESSURE</h1>
                        <div className="OD-info">
                            <div className="ODI-div">
                                <p className="weather-info-p">SEA LVL</p>
                                <h1 className="weather-info-h1">{mainData.wind && mainData.wind.sea_level ? mainData.wind.sea_level : "-"} hPa</h1>
                            </div>
                            <div className="ODI-div">
                                <p className="weather-info-p">GROUND LVL</p>
                                <h1 className="weather-info-h1">{mainData.wind && mainData.wind.grnd_level ? mainData.wind.grnd_level : "-"} hPa</h1>
                            </div>
                        </div>
                    </div>
                    <div className="OD-div">
                        <h1 style={windStyle}>CLOUDS</h1>
                        <div className="OD-info">
                            <div className="ODI-div">
                                <p className="weather-info-p">CLOUDINESS</p>
                                <h1 className="weather-info-h1">{mainData.clouds && mainData.clouds.all ? mainData.clouds.all : "-"} %</h1>
                            </div>
                        </div>
                    </div>
                    <div className="OD-div">
                        <h1 style={windStyle}>SUN</h1>
                        <div className="OD-info">
                            <div className="ODI-div">
                                <p className="weather-info-p">SUNRISE</p>
                                <h1 className="weather-info-h1">{sunrise} AM</h1>
                            </div>
                            <div className="ODI-div">
                                <p className="weather-info-p">SUNSET</p>
                                <h1 className="weather-info-h1">{sunset} PM</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="windmill-logo"></div>
            </div>
        );
    }
}