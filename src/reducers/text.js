const textReducer = (state = '', {
    type,
    payload
}) => {
    switch (type) {
        case 'SET_TEXT':
            return payload;
        default:
            return state;
    }
};

export default textReducer;