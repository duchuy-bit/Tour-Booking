// const defaultArr =[]; 
const cartReducer = (state = 0 , action)=>{
    if (action.type === 'ChangeCart') return [action.amountCart];
    return state;
}

export default cartReducer;