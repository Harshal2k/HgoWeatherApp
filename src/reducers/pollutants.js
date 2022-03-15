const pollutantsReducer = (state = {index:0,component:{},aqi:1}, {
    type,
    payload
}) => {
    switch(type){
        case 'SET_POLLUTANTS':
            return payload;
        default:
            return state;
    }   
};

export default pollutantsReducer;