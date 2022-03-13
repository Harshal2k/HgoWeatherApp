import React from "react";

const WeatherInfo = ({ header, data, unit }) => {
    return (
        <div className="weather-info-div">
            <p className="info-p">{header}</p>
            <h1 className="info-h1">{data}</h1>
            {unit == "deg" ?
                <p className="info-p">&#8451;</p> :
                <p className="info-p">{unit}</p>
            }
        </div>
    );
};

export default WeatherInfo;