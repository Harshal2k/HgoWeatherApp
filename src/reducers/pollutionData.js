const pollutionDataReducer = (state={},{
    type,
    payload,
})=>{
    switch(type){
        case 'SET_POLLUTIONDATA':
            return payload;
        default:
            return state;
    }
}

export default pollutionDataReducer;