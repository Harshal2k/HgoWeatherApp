import React from "react";
import firebaseConfig from "../Firebase";
import { useSelector, useDispatch } from 'react-redux';
import { setCountry, setSuggestion, setCity, setData, setProgress, setCoordinates } from '../actions'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import {
    initializeApp
} from "firebase/app";

var cities = [];
var fullCitiesData={}
var country = '';
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

async function suggestionSelected(value, dispatch, btnClicked) {
    try {
        //Removes special characters from the names eg: "Harran al ‘Awamid" here ' (single quote) will be removed
        var formattedValue = value.replace(/[^a-zA-Z0-9- ]/g, "");
        dispatch(setSuggestion([]));
        dispatch(setCity(formattedValue));
        if(value in fullCitiesData){
            dispatch(setCoordinates(fullCitiesData[value].co));
        }
        dispatch(setProgress(10));
        var res = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + formattedValue + '&appid=55a9eb7841d75035fb7b5cab3b1abe38');
        if (res.status === 404) {
            throw res.status;
        }
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
                alert(`The data for ${formattedValue} will be displayed but, "${formattedValue}" is not a city in "${country}", Please consider swithching the country`);
            }
        }
        dispatch(setProgress(65));
        const data = await res.json()
        dispatch(setProgress(80));
        dispatch(setData(data));
        dispatch(setProgress(100));
    } catch (error) {
        if (error === 404) {
            alert(`"${formattedValue}" is NOT a CITY`);
            dispatch(setCity(''));
            dispatch(setCoordinates({lat:0,lon:0}));
            dispatch(setData({}));
            dispatch(setProgress(100));
        } else {
            alert("Something went wrong :(");
            dispatch(setProgress(100));
        }

    }
}

function renderSuggestions(dispatch, suggestions) {
    return (
        <ul className="searchDiv-ul">
            {suggestions.map((elem, index) =>
                <li key={index} className="searchDiv-li"
                    onClick={() => { suggestionSelected(elem, dispatch) }}>{elem}</li>)}
        </ul>
    );
}

async function getCities(code, dispatch, selectedCountryname) {
    try {
        dispatch(setProgress(10));
        initializeApp(firebaseConfig);
        var db = await getFirestore();
        dispatch(setProgress(35));
        var data=[]
        if(code==='DE'){
            //TWO TIMES BCOZ DATA FOR THIS COUNTRY IS STORED IN TWO PARTS 'DE' & 'DE1' DUE TO SIZE ISSUES
            const getData01 = await getDoc(doc(db,"City","DE"));
            const getData02 = await getDoc(doc(db,"City","DE1"));
            data=[getData01,getData02];
        }else{
            data=await getDoc(doc(db,"City",code));
        }
        dispatch(setProgress(70));
        if (data) {
            var fullData=data.data().cities;
            fullData.forEach(elem=>{
                fullCitiesData[elem.name]=elem;
            });
            cities = fullData.map(elem=>elem.name);
            dispatch(setProgress(80));
            dispatch(setCountry(selectedCountryname));
            dispatch(setProgress(100));
        } else {
            cities = []
            dispatch(setProgress(100));
        }
    } catch (err) {
        dispatch(setProgress(100));
        alert("Something Went Wrong!");
    }
}


function useRenderSearch() {
    const countryName = useSelector(state => state.country);
    const city = useSelector(state => state.city);
    const suggestions = useSelector(state => state.suggestion);
    const dispatch = useDispatch();
    if (countryName === '') {
        var countries = [];
        for (const key in countryCodes) {
            countries.push(key);
        }
        countries=countries.sort();
        return (
            <div style={{ margin: "1rem" }}>
                <select id="ab" className="selectStyle" name="countries" size={1} onChange={(e) => { country = e.target.value; getCities(countryCodes[e.target.value], dispatch, e.target.value) }} >
                    <option value={""}>Select Your Country</option>
                    {
                        countries.map((elem, index) =>
                            <option value={elem} >{elem}</option>)
                    }
                </select>
            </div>
        );
    } else {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", flexDirection: "column" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <button className="searchDiv-button btnLeft" onClick={() => { dispatch(setData({})); dispatch(setCity('')); dispatch(setCoordinates({lat:0,lon:0})); dispatch(setCountry('')); }}>Change Country</button>
                    <button className="searchDiv-button btnRight" onClick={(event) => {
                        const result = document.getElementById("searchBox").value;
                        suggestionSelected(result, dispatch, true);
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

const Search = () => {
    return (
        <div className="searchDiv">
            {useRenderSearch()}
        </div>
    );
};

export default Search;