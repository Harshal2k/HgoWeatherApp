export const setCountry = (country) => {
    return {
        type: 'SET_COUNTRY',
        payload: country,
    };
};

export const setCity = (city) => {
    return {
        type: 'SET_CITY',
        payload: city,
    };
};

export const setSuggestion = (suggestions) => {
    return {
        type: 'SET_SUGGESTIONS',
        payload: suggestions,
    };
};

export const setData = (data) => {
    return {
        type: 'SET_DATA',
        payload: data,
    };
};

export const setProgress = (progress) => {
    return {
        type: 'SET_PROGRESS',
        payload: progress,
    };
};

export const setCoordinates = (coordinates) => {
    return {
        type: 'SET_COORDINATES',
        payload: coordinates,
    }
};

export const setPollutionData = (pollutionData) => {
    return {
        type: 'SET_POLLUTIONDATA',
        payload: pollutionData
    }
}

export const setPollutants = (pollutants) => {
    return {
        type: 'SET_POLLUTANTS',
        payload: pollutants
    }
}

export const setBulkWeatherData = (bulkWeatherData) => {
    return {
        type: 'SET_BULK_WEATHER_DATA',
        payload: bulkWeatherData
    }
}

export const setNewsData = (newsData) => {
    return {
        type: 'SET_NEWSDATA',
        payload: newsData,
    }
}

export const setPopupState = (popupState) => {
    return {
        type: 'SET_POPUPSTATE',
        payload: popupState,
    }
}

