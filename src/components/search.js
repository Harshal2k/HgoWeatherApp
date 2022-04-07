import React, { useState } from "react";
import firebaseConfig from "../Firebase";
import { useSelector, useDispatch } from 'react-redux';
import { setCountry, setSuggestion, setCity, setData, setProgress, setCoordinates, setPollutionData, setPollutants, setBulkWeatherData } from '../actions'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import {
    initializeApp
} from "firebase/app";
import LoadingBar from 'react-top-loading-bar'

var cities = [];
var fullCitiesData = {}
var country = '';
var gettingCities = false;
const countryCodes = { "Iran, Islamic Republic Of": "IR", "Syrian Arab Republic": "SY", "Cyprus": "CY", "Yemen": "YE", "RWANDA": "RW", "Somalia": "SO", "Libyan Arab Jamahiriya": "LY", "Iraq": "IQ", "Saudi Arabia": "SA", "Angola": "AO", "United Kingdom": "GB", "Azerbaijan": "AZ", "Tanzania, United Republic of": "TZ", "Turkmenistan": "TM", "Armenia": "AM", "Zambia": "ZM", "Kenya": "KE", "Congo, The Democratic Republic of the": "CD", "Djibouti": "DJ", "Uganda": "UG", "Malawi": "MW", "Central African Republic": "CF", "Seychelles": "SC", "Chad": "TD", "Jordan": "JO", "Greece": "GR", "Lebanon": "LB", "Palestinian Territory, Occupied": "PS", "Israel": "IL", "Kuwait": "KW", "Oman": "OM", "Qatar": "QA", "Bahrain": "BH", "United Arab Emirates": "AE", "Turkey": "TR", "Ethiopia": "ET", "Eritrea": "ER", "Egypt": "EG", "Albania": "AL", "Sudan": "SD", "South Sudan": "SS", "Burundi": "BI", "Finland": "FI", "Russian Federation": "RU", "Estonia": "EE", "Bulgaria": "BG", "Uzbekistan": "UZ", "Latvia": "LV", "Ukraine": "UA", "Georgia": "GE", "Lithuania": "LT", "Sweden": "SE", "Kazakhstan": "KZ", "Belarus": "BY", "Moldova, Republic of": "MD", "Åland Islands": "AX", "Romania": "RO", "Hungary": "HU", "Macedonia, The Former Yugoslav Republic of": "MK", "Slovakia": "SK", "Poland": "PL", "Norway": "NO", "Serbia": "RS", "Kosovo": "XK", "Montenegro": "ME", "Namibia": "NA", "Zimbabwe": "ZW", "Comoros": "KM", "Mayotte": "YT", "Lesotho": "LS", "Botswana": "BW", "Mauritius": "MU", "Swaziland": "SZ", "Reunion": "RE", "South Africa": "ZA", "Mozambique": "MZ", "Madagascar": "MG", "Pakistan": "PK", "Thailand": "TH", "Afghanistan": "AF", "India": "IN", "Bangladesh": "BD", "Indonesia": "ID", "Tajikistan": "TJ", "Malaysia": "MY", "Kyrgyzstan": "KG", "Sri Lanka": "LK", "Bhutan": "BT", "China": "CN", "Maldives": "MV", "Nepal": "NP", "Myanmar": "MM", "Mongolia": "MN", "French Southern Territories": "TF", "Cocos (Keeling) Islands": "CC", "Palau": "PW", "Viet Nam": "VN", "Timor-Leste": "TL", "Lao People'S Democratic Republic": "LA", "Taiwan, Province of China": "TW", "Philippines": "PH", "Hong Kong": "HK", "Brunei Darussalam": "BN", "Macao": "MO", "Cambodia": "KH", "Korea, Republic of": "KR", "Japan": "JP", "Korea, Democratic People'S Republic of": "KP", "Singapore": "SG", "Cook Islands": "CK", "Australia": "AU", "Christmas Island": "CX", "Marshall Islands": "MH", "Micronesia, Federated States of": "FM", "Papua New Guinea": "PG", "Solomon Islands": "SB", "Kiribati": "KI", "Tuvalu": "TV", "Nauru": "NR", "Vanuatu": "VU", "New Caledonia": "NC", "Norfolk Island": "NF", "New Zealand": "NZ", "Fiji": "FJ", "Cameroon": "CM", "Senegal": "SN", "Congo": "CG", "Portugal": "PT", "Liberia": "LR", "Cote D'Ivoire": "CI", "Ghana": "GH", "Equatorial Guinea": "GQ", "Nigeria": "NG", "Burkina Faso": "BF", "Togo": "TG", "Guinea-Bissau": "GW", "Mauritania": "MR", "Benin": "BJ", "Gabon": "GA", "Sierra Leone": "SL", "Sao Tome and Principe": "ST", "Saint Helena": "SH", "Gibraltar": "GI", "Gambia": "GM", "Guinea": "GN", "Niger": "NE", "Mali": "ML", "Western Sahara": "EH", "Tunisia": "TN", "Algeria": "DZ", "Spain": "ES", "Italy": "IT", "Morocco": "MA", "Malta": "MT", "Austria": "AT", "Denmark": "DK", "Faroe Islands": "FO", "Iceland": "IS", "Ireland": "IE", "Switzerland": "CH", "Svalbard and Jan Mayen": "SJ", "Netherlands": "NL", "Belgium": "BE", "Germany": "DE", "Luxembourg": "LU", "France": "FR", "Monaco": "MC", "AndorrA": "AD", "Liechtenstein": "LI", "Jersey": "JE", "Isle of Man": "IM", "Guernsey": "GG", "Czech Republic": "CZ", "Holy See (Vatican City State)": "VA", "San Marino": "SM", "Croatia": "HR", "Bosnia and Herzegovina": "BA", "Slovenia": "SI", "Barbados": "BB", "Cape Verde": "CV", "Guyana": "GY", "French Guiana": "GF", "Suriname": "SR", "Brazil": "BR", "Greenland": "GL", "Saint Pierre and Miquelon": "PM", "South Georgia and the South Sandwich Islands": "GS", "Falkland Islands (Malvinas)": "FK", "Argentina": "AR", "Paraguay": "PY", "Uruguay": "UY", "Bolivia": "BO", "Venezuela": "VE", "Mexico": "MX", "Jamaica": "JM", "Dominican Republic": "DO", "Caribbean Netherlands": "BQ", "Curaçao": "CW", "Sint Maarten": "SX", "Cuba": "CU", "Martinique": "MQ", "Bahamas": "BS", "Bermuda": "BM", "Anguilla": "AI", "Trinidad and Tobago": "TT", "Saint Kitts and Nevis": "KN", "Dominica": "DM", "Antigua and Barbuda": "AG", "Saint Lucia": "LC", "Turks and Caicos Islands": "TC", "Aruba": "AW", "Virgin Islands, British": "VG", "Saint Vincent and the Grenadines": "VC", "Montserrat": "MS", "Guadeloupe": "GP", "Saint Martin": "MF", "Saint Barthélemy": "BL", "Grenada": "GD", "Cayman Islands": "KY", "Belize": "BZ", "El Salvador": "SV", "Guatemala": "GT", "Honduras": "HN", "Nicaragua": "NI", "Costa Rica": "CR", "Ecuador": "EC", "Colombia": "CO", "Peru": "PE", "Panama": "PA", "Haiti": "HT", "Chile": "CL", "French Polynesia": "PF", "Pitcairn": "PN", "Tokelau": "TK", "Tonga": "TO", "Wallis and Futuna": "WF", "Samoa": "WS", "Niue": "NU", "Guam": "GU", "Northern Mariana Islands": "MP", "United States": "US", "Puerto Rico": "PR", "Virgin Islands, U.S.": "VI", "American Samoa": "AS", "Canada": "CA", "Others": "OTH", "Antarctica": "AQ" }

function suggestNames(e, dispatch) {
    const suggestions = []
    var count = 0;
    if (e.target.value !== "") {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].toUpperCase().startsWith(e.target.value.toUpperCase())) {
                suggestions.push(cities[i])
                count++;
            }
            if (count >= 10) {
                break;
            }
        }
    }

    dispatch(setSuggestion(suggestions));
    dispatch(setCity(e.target.value));
}

async function suggestionSelected(value, dispatch, btnClicked, setProgress) {
    try {
        //Removes special characters from the names eg: "Harran al ‘Awamid" here ' (single quote) will be removed
        setProgress(30);
        var formattedValue = value.replace(/[^a-zA-Z0-9- ]/g, "");
        if (btnClicked) {
            const val = formattedValue.toLowerCase();
            var exists = false;
            for (var i = 0; i < cities.length; i++) {
                if (cities[i].replace(/[^a-zA-Z0-9- ]/g, "").toLowerCase() === val) {
                    dispatch(setCoordinates(fullCitiesData[cities[i]].co));
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                alert(`"${formattedValue}" is not a city in "${country}", Please consider swithching the country OR use map to locate it.`);
                dispatch(setCountry(''));
            }
        } else {
            if (value in fullCitiesData) {
                dispatch(setCoordinates(fullCitiesData[value].co));
            }
        }
        dispatch(setSuggestion([]));
        dispatch(setCity(formattedValue));
        dispatch(setPollutionData({}));
        console.log("reset")
        dispatch(setBulkWeatherData({}));
        dispatch(setData({}));
        dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
        setProgress(100);
    } catch (error) {
        if (error === 404) {
            alert(`"${formattedValue}" is NOT a CITY`);
        } else {
            alert(`Something went wrong :(\n${error}`);
        }
        resetStates(dispatch);
        setProgress(100);
    }
}

function resetStates(dispatch) {
    dispatch(setCity(''));
    dispatch(setPollutionData({}));
    dispatch(setPollutants({ index: 0, component: {}, aqi: 1 }));
    dispatch(setCoordinates({ lat: "-", lon: "-" }));
    dispatch(setData({}));
}

function renderSuggestions(dispatch, suggestions) {
    return (
        <ul className="searchDiv-ul">
            {suggestions.map((elem, index) =>
                <li key={index} className="searchDiv-li"
                    onClick={() => { suggestionSelected(elem, dispatch, false, setProgress) }}>{elem}</li>)}
        </ul>
    );
}

async function getCities(code, dispatch, selectedCountryname, setProgress) {
    try {
        console.log("getting cities")
        gettingCities = true;
        setProgress(10);
        initializeApp(firebaseConfig);
        var db = await getFirestore();
        setProgress(35);
        var data = []
        if (code === 'DE') {
            //TWO TIMES BCOZ DATA FOR THIS COUNTRY IS STORED IN TWO PARTS 'DE' & 'DE1' DUE TO SIZE ISSUES
            const getData01 = await getDoc(doc(db, "City", "DE"));
            const getData02 = await getDoc(doc(db, "City", "DE1"));
            data = [getData01, getData02];
        } else {
            data = await getDoc(doc(db, "City", code));
        }
        setProgress(70);
        if (data) {
            var fullData = data.data().cities;
            fullData.forEach(elem => {
                fullCitiesData[elem.name] = elem;
            });
            cities = fullData.map(elem => elem.name);
            setProgress(80);
            dispatch(setCountry(selectedCountryname));
            setProgress(100);
        } else {
            cities = []
            setProgress(100);
        }
    } catch (err) {
        setProgress(100);
        alert(`Something Went Wrong :(\n${err}`);
    } finally {
        gettingCities = false;
    }
}


function useRenderSearch(setProgress) {
    const countryName = useSelector(state => state.country);
    let city = useSelector(state => state.city);
    if (city.includes("--resetCity--")) {
        city = city.slice(13);
    }
    const suggestions = useSelector(state => state.suggestion);
    const dispatch = useDispatch();
    if (countryName === '') {
        var countries = [];
        for (const key in countryCodes) {
            countries.push(key);
        }
        countries = countries.sort();
        return (
            <div style={{ margin: "1rem" }}>
                <select id="ab" className="selectStyle" name="countries" size={1}
                    onChange={(e) => {
                        country = e.target.value;
                        if (!gettingCities) {
                            getCities(countryCodes[e.target.value], dispatch, e.target.value, setProgress)
                        }
                    }}>
                    <option value={""}>Select Your Country</option>
                    {
                        countries.map((elem, index) =>
                            <option key={index} value={elem} >{elem}</option>)
                    }
                </select>
            </div>
        );
    } else {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <button className="searchDiv-button btnLeft" onClick={() => { resetStates(dispatch); dispatch(setCountry('')); }}>Change Country</button>
                    <button className="searchDiv-button btnRight" onClick={(event) => {
                        const result = document.getElementById("searchBox").value;
                        suggestionSelected(result, dispatch, true, setProgress);
                    }}>Search</button>
                </div>
                <div>
                    <input className="searchDiv-Input" id="searchBox" type="text" placeholder="Search For Your City" value={city} onChange={(event) => { suggestNames(event, dispatch, false) }}></input>
                    {renderSuggestions(dispatch, suggestions)}
                </div>
            </div>

        );
    }
}

function displayMap() {
    document.body.scrollTop = 0;// for safari
    document.documentElement.scrollTop = 0;// for rest of the browsers
    document.querySelector("#mapCont").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
}

const Search = () => {
    const [progress, setProgress] = useState(0);
    return (
        <div className="searchDiv">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)} />
            {useRenderSearch(setProgress)}
            <button id="mapBtn" style={{ marginTop: "1rem" }} className="searchDiv-button" onClick={() => { displayMap() }}>Use Map to locate</button>
        </div>
    );
};

export default Search;