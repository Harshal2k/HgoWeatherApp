const suggestionReducer = (state = [], {
    type,
    payload
}) => {
    switch (type) {
        case 'SET_SUGGESTIONS':
            return payload;
        default:
            return state;
    }
};

export default suggestionReducer;