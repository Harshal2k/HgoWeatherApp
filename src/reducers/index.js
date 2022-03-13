import suggestionReducer from './suggestions';
import cityReducer from './city';
import countryReducer from './country';
import progressReducer from './progress';
import dataReducer from './data';
import coordinatesReducer from './coordinates';
import pollutionDataReducer from './pollutionData';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    country:countryReducer,
    city:cityReducer,
    suggestion:suggestionReducer,
    progress:progressReducer,
    data:dataReducer,
    coordinates:coordinatesReducer,
    pollutionData:pollutionDataReducer,
});

export default allReducers;