export const setCountry = (country)=>{
    return{
        type:'SET_COUNTRY',
        payload:country,
    };
};

export const setText = (text)=>{
    return{
        type:'SET_TEXT',
        payload:text,
    };
};

export const setSuggestion = (suggestions)=>{
    return{
        type:'SET_SUGGESTIONS',
        payload:suggestions,
    };
};

export const setData = (data)=>{
    return{
        type:'SET_DATA',
        payload:data,
    };
};

export const setProgress = (progress)=>{
    return{
        type:'SET_PROGRESS',
        payload:progress,
    };
};

