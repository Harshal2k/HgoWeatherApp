const bulkWeatherData = (state = {}, { type, payload }) => {
    switch (type) {
        case 'SET_BULK_WEATHER_DATA':
            return payload;
        default:
            return state;
    }
};

export default bulkWeatherData;