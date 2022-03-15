const coordinatesReducer =(state={lat:"-",lon:"-"},{type,payload})=>{
    switch(type){
        case 'SET_COORDINATES':
            return payload;
        default:
            return state;
    }
}

export default coordinatesReducer;