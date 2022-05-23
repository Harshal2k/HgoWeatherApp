const newsDataReducer = (state = {}, {
    type,
    payload
}) => {
    switch (type) {
        case 'SET_NEWSDATA':
            return payload;
        default:
            return state;
    }
};

export default newsDataReducer;