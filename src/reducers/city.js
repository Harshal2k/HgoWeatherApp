const cityReducer = (state = '', {
    type,
    payload
}) => {
    switch (type) {
        case 'SET_CITY':
            return payload;
        default:
            return state;
    }
};

export default cityReducer;