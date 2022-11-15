import { createStore , combineReducers } from 'redux';
import customerReducer from './customerReducer';
import cartReducer from './cartReducer';
import bottomSliderReducer from './bottomSliderReducer';


const reducer = combineReducers({
    idCustomer: customerReducer,
    cartAmount: cartReducer,
    bottomSlider: bottomSliderReducer
})
    // tao ra store
const store = createStore(reducer);

export default store;