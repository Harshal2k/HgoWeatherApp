import React from "react";

const Pollutants = ({ pollutantsObj }) => {
    var arr = [];

    for (const key in pollutantsObj) {
        arr.push({ key: key, value: pollutantsObj[key] });
    }

    for (var i = 0; i < arr.length - 1; i++) {
        var swap = false;
        for (var j = 0; j < arr.length - 1; j++) {
            if (Number(arr[j].value) < Number(arr[j + 1].value)) {
                var obj1 = arr[j]
                var obj2 = arr[j + 1]
                arr[j] = obj2
                arr[j + 1] = obj1
                swap = true;
            }
        }
        if (!swap) {
            break;
        }
    }

    return (
        <div className="pollutionContainer neumorphismEffect" style={{ maxWidth: "90%", marginTop: "2.5rem", marginBottom: "2.5rem" }}>
            <h1 className="info-h1">Pollutant concentration in μg/m3</h1>
            <div className="pollutionContainer" style={{ flexDirection: "unset", marginTop:"0.7rem" }}>
                {arr.map((elem) =>
                    <div className="neumorphismEffect" style={{ width: "9rem", margin: "0.5rem", height:"9rem" }}>
                        {generateName(elem.key)}
                        <h1 className="textWithBg" style={{ fontSize: "2rem", marginTop: "0.2rem" }}>{elem.value.toFixed(2)}</h1>
                        <p className="info-p">μg/m<sup>3</sup></p>
                    </div>
                )}
            </div>
        </div>

    );
};

const generateName = (name) => {
    switch (name) {
        case 'co':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>CO</h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Carbon monoxide</p>
                </React.Fragment>
            );
        case 'no':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>NO</h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Nitrogen monoxide</p>
                </React.Fragment>
            );
        case 'no2':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>NO<sub>2</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Nitrogen oxide</p>
                </React.Fragment>
            );

        case 'o3':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>O<sub>3</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Ozone</p>
                </React.Fragment>
            );

        case 'so2':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>SO<sub>2</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Sulphur dioxide</p>
                </React.Fragment>
            );
        case 'pm2_5':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>PM<sub>2.5</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Fine particles matter</p>
                </React.Fragment>
            );
        case 'pm10':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>PM<sub>10</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Coarse parti. matter</p>
                </React.Fragment>
            );
        case 'nh3':
            return (
                <React.Fragment>
                    <h1 className="info-h1" style={{height:"2rem"}}>NH<sub>3</sub></h1>
                    <p className="info-p" style={{height:"1.8rem"}}>Ammonia</p>
                </React.Fragment>
            );

        default:
            break;
    }
};

export default Pollutants;