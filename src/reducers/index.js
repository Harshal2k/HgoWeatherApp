import suggestionReducer from './suggestions';
import cityReducer from './city';
import countryReducer from './country';
import progressReducer from './progress';
import dataReducer from './data';
import coordinatesReducer from './coordinates';
import pollutionDataReducer from './pollutionData';
import pollutantsReducer from './pollutants';
import bulkWeatherData from './bulkWeatherData';
import { combineReducers } from 'redux';
import newsDataReducer from './newsData';

const allReducers = combineReducers({
    country: countryReducer,
    city: cityReducer,
    suggestion: suggestionReducer,
    progress: progressReducer,
    data: dataReducer,
    coordinates: coordinatesReducer,
    pollutionData: pollutionDataReducer,
    pollutants: pollutantsReducer,
    bulkWeather: bulkWeatherData,
    newsData: newsDataReducer,
});

export default allReducers;