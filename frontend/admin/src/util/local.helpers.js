export const setLocalState=(key,data)=>{
localStorage.setItem(key,JSON.stringify(data));
}

export const getlocalState=(key)=>{
    const data=localStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }
    return null;
}

export const clearLocalState=(key)=>{
    localStorage.removeItem(key);
}