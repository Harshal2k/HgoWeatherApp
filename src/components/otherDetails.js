import React from "react";


//var elements = [{ name: speed, data: 1000, unit: "" }]
const OtherDetails = ({header,elements}) => {
    const windStyle = {
        color: "#444",
        fontSize: "1.8vmax",
        fontFamily: "Cabin",
        letterSpacing: "0.5vmax",
        fontWeight: "400"
    };
    console.log("abc",header);
    return (
        <div className="OD-div">
            <h1 style={windStyle}>{header}</h1>
            <div className="OD-info">
                {elements.map((elem) =>
                    <div className="ODI-div">
                        <p className="weather-info-p">{elem.name}</p>
                        {elem.unit === "deg" ?
                            <h1 className="weather-info-h1">{elem.data} &deg;</h1> :
                            <h1 className="weather-info-h1">{elem.data} {elem.unit}</h1>
                        }
                    </div>)
                }
            </div>
        </div>
    );
};

export default OtherDetails;

