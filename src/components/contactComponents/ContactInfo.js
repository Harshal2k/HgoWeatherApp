import React, { useEffect, useState } from "react";
import Lottie from "lottie-web";
import poor from '../../../src/static/poor.json'
import veryPoor from '../../../src/static/veryPoor.json';
import moderate from '../../../src/static/moderate.json';
import good from '../../../src/static/good.json';
import fair from '../../../src/static/fair.json';

const ContactInfo = () => {
    useEffect(() => {
        Lottie.loadAnimation({
            container: document.querySelector("#veryGood"),
            animationData: good,
        });
        Lottie.loadAnimation({
            container: document.querySelector("#good"),
            animationData: fair,
        });
        Lottie.loadAnimation({
            container: document.querySelector("#average"),
            animationData: moderate,
        });
        Lottie.loadAnimation({
            container: document.querySelector("#poor"),
            animationData: poor,
        });
        Lottie.loadAnimation({
            container: document.querySelector("#veryPoor"),
            animationData: veryPoor,
        });
        
    }, []);
    return (
        <div className="OD-div">
            <h1 className="info-h1">Rate this website</h1>
            <div className="other-details-cont">
                <div id="veryGood" className="lottieAnim" />
                <div id="good" className="lottieAnim" />
                <div id="average" className="lottieAnim" />
                <div id="poor" className="lottieAnim" />
                <div id="veryPoor" className="lottieAnim" />
            </div>
        </div>
    );
};

export default ContactInfo;