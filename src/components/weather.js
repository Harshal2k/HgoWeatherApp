import React from "react";
import { useSelector } from 'react-redux';
import OtherDetails from "./otherDetails";
import WeatherInfo from "./weatherInfo";

const countryNames = { "IR": "Iran, Islamic Republic Of", "SY": "Syrian Arab Republic", "CY": "Cyprus", "YE": "Yemen", "RW": "RWANDA", "SO": "Somalia", "LY": "Libyan Arab Jamahiriya", "IQ": "Iraq", "SA": "Saudi Arabia", "AO": "Angola", "GB": "United Kingdom", "AZ": "Azerbaijan", "TZ": "Tanzania, United Republic of", "TM": "Turkmenistan", "AM": "Armenia", "ZM": "Zambia", "KE": "Kenya", "CD": "Congo, The Democratic Republic of the", "DJ": "Djibouti", "UG": "Uganda", "MW": "Malawi", "CF": "Central African Republic", "SC": "Seychelles", "TD": "Chad", "JO": "Jordan", "GR": "Greece", "LB": "Lebanon", "PS": "Palestinian Territory, Occupied", "IL": "Israel", "KW": "Kuwait", "OM": "Oman", "QA": "Qatar", "BH": "Bahrain", "AE": "United Arab Emirates", "TR": "Turkey", "ET": "Ethiopia", "ER": "Eritrea", "EG": "Egypt", "AL": "Albania", "SD": "Sudan", "SS": "", "BI": "Burundi", "FI": "Finland", "RU": "Russian Federation", "EE": "Estonia", "BG": "Bulgaria", "UZ": "Uzbekistan", "LV": "Latvia", "UA": "Ukraine", "GE": "Georgia", "LT": "Lithuania", "SE": "Sweden", "KZ": "Kazakhstan", "BY": "Belarus", "MD": "Moldova, Republic of", "AX": "Åland Islands", "RO": "Romania", "HU": "Hungary", "MK": "Macedonia, The Former Yugoslav Republic of", "SK": "Slovakia", "PL": "Poland", "NO": "Norway", "RS": "", "XK": "", "ME": "", "NA": "Namibia", "ZW": "Zimbabwe", "KM": "Comoros", "YT": "Mayotte", "LS": "Lesotho", "BW": "Botswana", "MU": "Mauritius", "SZ": "Swaziland", "RE": "Reunion", "ZA": "South Africa", "MZ": "Mozambique", "MG": "Madagascar", "PK": "Pakistan", "TH": "Thailand", "AF": "Afghanistan", "IN": "India", "BD": "Bangladesh", "ID": "Indonesia", "TJ": "Tajikistan", "MY": "Malaysia", "KG": "Kyrgyzstan", "LK": "Sri Lanka", "BT": "Bhutan", "CN": "China", "MV": "Maldives", "NP": "Nepal", "MM": "Myanmar", "MN": "Mongolia", "TF": "French Southern Territories", "CC": "Cocos (Keeling) Islands", "PW": "Palau", "VN": "Viet Nam", "TL": "Timor-Leste", "LA": "Lao People'S Democratic Republic", "TW": "Taiwan, Province of China", "PH": "Philippines", "HK": "Hong Kong", "BN": "Brunei Darussalam", "MO": "Macao", "KH": "Cambodia", "KR": "Korea, Republic of", "JP": "Japan", "KP": "Korea, Democratic People'S Republic of", "SG": "Singapore", "CK": "Cook Islands", "AU": "Australia", "CX": "Christmas Island", "MH": "Marshall Islands", "FM": "Micronesia, Federated States of", "PG": "Papua New Guinea", "SB": "Solomon Islands", "KI": "Kiribati", "TV": "Tuvalu", "NR": "Nauru", "VU": "Vanuatu", "NC": "New Caledonia", "NF": "Norfolk Island", "NZ": "New Zealand", "FJ": "Fiji", "CM": "Cameroon", "SN": "Senegal", "CG": "Congo", "PT": "Portugal", "LR": "Liberia", "CI": "Cote D'Ivoire", "GH": "Ghana", "GQ": "Equatorial Guinea", "NG": "Nigeria", "BF": "Burkina Faso", "TG": "Togo", "GW": "Guinea-Bissau", "MR": "Mauritania", "BJ": "Benin", "GA": "Gabon", "SL": "Sierra Leone", "ST": "Sao Tome and Principe", "SH": "Saint Helena", "GI": "Gibraltar", "GM": "Gambia", "GN": "Guinea", "NE": "Niger", "ML": "Mali", "EH": "Western Sahara", "TN": "Tunisia", "DZ": "Algeria", "ES": "Spain", "IT": "Italy", "MA": "Morocco", "MT": "Malta", "AT": "Austria", "DK": "Denmark", "FO": "Faroe Islands", "IS": "Iceland", "IE": "Ireland", "CH": "Switzerland", "SJ": "Svalbard and Jan Mayen", "NL": "Netherlands", "BE": "Belgium", "DE": "Germany", "LU": "Luxembourg", "FR": "France", "MC": "Monaco", "AD": "AndorrA", "LI": "Liechtenstein", "JE": "Jersey", "IM": "Isle of Man", "GG": "Guernsey", "CZ": "Czech Republic", "VA": "Holy See (Vatican City State)", "SM": "San Marino", "HR": "Croatia", "BA": "Bosnia and Herzegovina", "SI": "Slovenia", "BB": "Barbados", "CV": "Cape Verde", "GY": "Guyana", "GF": "French Guiana", "SR": "Suriname", "BR": "Brazil", "GL": "Greenland", "PM": "Saint Pierre and Miquelon", "GS": "South Georgia and the South Sandwich Islands", "FK": "Falkland Islands (Malvinas)", "AR": "Argentina", "PY": "Paraguay", "UY": "Uruguay", "BO": "Bolivia", "VE": "Venezuela", "MX": "Mexico", "JM": "Jamaica", "DO": "Dominican Republic", "BQ": "", "CW": "", "SX": "", "CU": "Cuba", "MQ": "Martinique", "BS": "Bahamas", "BM": "Bermuda", "AI": "Anguilla", "TT": "Trinidad and Tobago", "KN": "Saint Kitts and Nevis", "DM": "Dominica", "AG": "Antigua and Barbuda", "LC": "Saint Lucia", "TC": "Turks and Caicos Islands", "AW": "Aruba", "VG": "Virgin Islands, British", "VC": "Saint Vincent and the Grenadines", "MS": "Montserrat", "GP": "Guadeloupe", "MF": "", "BL": "", "GD": "Grenada", "KY": "Cayman Islands", "BZ": "Belize", "SV": "El Salvador", "GT": "Guatemala", "HN": "Honduras", "NI": "Nicaragua", "CR": "Costa Rica", "EC": "Ecuador", "CO": "Colombia", "PE": "Peru", "PA": "Panama", "HT": "Haiti", "CL": "Chile", "PF": "French Polynesia", "PN": "Pitcairn", "TK": "Tokelau", "TO": "Tonga", "WF": "Wallis and Futuna", "WS": "Samoa", "NU": "Niue", "GU": "Guam", "MP": "Northern Mariana Islands", "US": "United States", "PR": "Puerto Rico", "VI": "Virgin Islands, U.S.", "AS": "American Samoa", "CA": "Canada", "AQ": "Antarctica" }

const Weather = () => {
    const mainData = useSelector(state => state.data);
    const country = useSelector(state => state.country);
    const city = useSelector(state => state.text);
    var sunrise = "-";
    var sunset = "-";
    if (mainData && mainData.sys && mainData.sys.sunrise) {
        const riseDate = new Date(mainData.sys.sunrise * 1000);
        const time = (riseDate.getHours()) + ":" + riseDate.getMinutes();
        console.log("time1: ", time);
        sunrise = time;
    }

    if (mainData && mainData.sys && mainData.sys.sunset) {
        const riseDate = new Date(mainData.sys.sunset * 1000);
        const time = (riseDate.getHours()) + ":" + riseDate.getMinutes();
        console.log("time2: ", time);
        sunset = time;
    }
    const windSpeed = [
        { name: "SPEED", data: mainData.wind && mainData.wind.speed ? mainData.wind.speed : "-", unit: "m/s" },
        { name: "GUST", data: mainData.wind && mainData.wind.gust ? mainData.wind.gust : "-", unit: "m/s" },
        { name: "DEGREE", data: mainData.wind && mainData.wind.deg ? mainData.wind.deg : "-", unit: "deg" },]

    const pressure = [
        { name: "SEA LVL", data: mainData.wind && mainData.wind.sea_level ? mainData.wind.sea_level : "-", unit: "hPa" },
        { name: "GROUND LVL", data: mainData.wind && mainData.wind.grnd_level ? mainData.wind.grnd_level : "-", unit: "hPa" },]

    const clouds = [{ name: "CLOUDINESS", data: mainData.clouds && mainData.clouds.all ? mainData.clouds.all : "-", unit: "%" }]

    return (
        <div className="weather-details-cont">
            <div className="weather-div">
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom:"1vmax" }}>
                    <h3 style={{ fontSize: "1vmax" }} className="weather-info-p">Country: {country ? countryNames[country] : "-"}</h3>
                    <h3 style={{ fontSize: "1vmax" }} className="weather-info-p">City: {city ? city : "-"}</h3>
                </div>
                <div className="weather-temp">
                    <p style={{ marginTop: "23%", color: "white", fontSize: "1vmax" }} className="weather-info-p">TEMP</p>
                    <h1 className="weather-temp-h1">{mainData.main && mainData.main.temp ? (mainData.main.temp - 273.15).toFixed(1) : "-"}</h1>
                    <p style={{ fontSize: "1vmax" }} className="weather-temp-p">&#8451;</p>
                </div>
                <div className="weather-info">
                    <WeatherInfo header="FEELS LIKE" unit="deg" data={mainData.main && mainData.main.feels_like ? (mainData.main.feels_like - 273.15).toFixed(1) : "-"}/>
                    <WeatherInfo header="TEMP MIN" unit="deg" data={mainData.main && mainData.main.temp_min ? (mainData.main.temp_min - 273.15).toFixed(1) : "-"}/>
                    <WeatherInfo header="TEMP MAX" unit="deg" data={mainData.main && mainData.main.temp_max ? (mainData.main.temp_max - 273.15).toFixed(1) : "-"}/>
                    <WeatherInfo header="PRESSURE" unit="hPa" data={mainData.main && mainData.main.pressure ? mainData.main.pressure : "-"}/>
                    <WeatherInfo header="HUMIDITY" unit="%" data={mainData.main && mainData.main.humidity ? mainData.main.humidity : "-"}/>
                </div>
            </div>
            <div className="other-details-cont">
                <OtherDetails header="WIND" elements={windSpeed}/>
                <OtherDetails header="PRESSURE" elements={pressure}/>
                <OtherDetails header="CLOUDS" elements={clouds}/>
                <OtherDetails header="SUN" elements={[{name:"SUNRISE",data:sunrise,unit:"AM"},{name:"SUNSET",data:sunset,unit:"PM"}]}/>
            </div>
        </div>
    );
}

export default Weather;