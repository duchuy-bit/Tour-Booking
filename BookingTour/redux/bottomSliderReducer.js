// const defaultArr =[]; 
const bottomSliderReducer = (state = false , action)=>{
    if (action.type === 'BOTTOM_SLIDER') return !state;
    return state;
}

export default bottomSliderReducer;