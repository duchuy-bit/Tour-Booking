const defaultArr =[]; 
const customerReducer = (state = defaultArr , action)=>{
    if (action.type === 'LOGINSUCCESS') return [action.id];
    return state;
}

export default customerReducer;