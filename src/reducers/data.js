const dataReducer=(state={},{type,payload})=>{
    switch (type) {
        case 'SET_DATA':
            return payload;
        default:
            return state;
    }
};

export default dataReducer;