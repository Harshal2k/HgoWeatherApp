const countryReducer = (state = '', {
    type,
    payload
}) => {
    switch (type) {
        case 'SET_COUNTRY':
            return payload;
        default:
            return state;
    }
};

export default countryReducer;