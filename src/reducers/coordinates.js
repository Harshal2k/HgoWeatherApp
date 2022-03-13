const coordinatesReducer =(state={lat:0,lon:0},{type,payload})=>{
    switch(type){
        case 'SET_COORDINATES':
            return payload;
        default:
            return state;
    }
}

export default coordinatesReducer;