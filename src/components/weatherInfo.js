import React from "react";

const WeatherInfo = ({ header, data, unit }) => {
    return (
        <div className="weather-info-div">
            <p className="weather-info-p">{header}</p>
            <h1 className="weather-info-h1">{data}</h1>
            {unit === "deg" ?
                <p className="weather-info-p">&#8451;</p> :
                <p className="weather-info-p">unit</p>
            }
        </div>
    );
};

export default WeatherInfo;