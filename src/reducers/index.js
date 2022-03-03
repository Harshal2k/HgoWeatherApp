import suggestionReducer from './suggestions';
import textReducer from './text';
import countryReducer from './country';
import progressReducer from './progress';
import dataReducer from './data';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    country:countryReducer,
    text:textReducer,
    suggestion:suggestionReducer,
    progress:progressReducer,
    data:dataReducer,
});

export default allReducers;