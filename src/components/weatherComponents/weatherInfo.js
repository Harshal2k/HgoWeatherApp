import React from "react";

const WeatherInfo = ({ header, data, unit }) => {
    let emoji = null;
    switch (header) {
        case 'FEELS LIKE':
            emoji = "๐ค";
            break;
        case 'TEMP MIN':
            emoji = "๐ก๐"
            break;
        case 'TEMP MAX':
            emoji = "๐กโ๏ธ";
            break;
        case 'PRESSURE':
            emoji = "๐๏ธ"
            break;
        case 'HUMIDITY':
            emoji = "๐ฆ"
            break;
        case 'DEW POINT':
            emoji = "๐ง"
            break;
        case 'UVI':
            emoji = "๐"
            break;
        case 'CLOUDS':
            emoji = "โ๏ธ"
            break;
        case 'VISIBILITY':
            emoji = "๐ซ๏ธ"
            break;
        case 'WIND SPEED':
            emoji = "๐"
            break;
        case 'WIND DEGREE':
            emoji = "๐"
            break;
        case 'WIND GUST':
            emoji = "๐จ"
            break;
        case 'TEMP DAY':
            emoji = "๐ก๐"
            break;
        case 'TEMP NIGHT':
            emoji = "๐ก๐"
            break;
        case 'TEMP MORN.':
            emoji = "๐ก๐"
            break;
        case 'TEMP EVE.':
            emoji = "๐ก๐ค๏ธ"
            break;
        case 'FEELS LIKE DAY':
            emoji = "๐ค๐"
            break;
        case 'FEELS LIKE NIGHT':
            emoji = "๐ค๐"
            break;
        case 'FEELS LIKE MORN.':
            emoji = "๐ค๐"
            break;
        case 'FEELS LIKE EVE.':
            emoji = "๐ค๐ค๏ธ"
            break;
        case 'SNOW VOLUME' || 'SNOW VOLUME (1Hr)':
            emoji = "๐จ๏ธ"
            break;
        case 'RAIN VOLUME' || 'RAIN VOLUME (1Hr)':
            emoji = "๐ง๏ธ"
            break;
        default:
            break;
    }
    return (
        <div className="weather-info-div">
            <p>{emoji}</p>
            <p className="info-p">{header}</p>
            <h1 className="info-h1">{data}</h1>
            {unit === "deg" ?
                <p className="info-p">&#8451;</p> :
                <p className="info-p">{unit}</p>
            }
        </div>
    );
};

export default WeatherInfo;