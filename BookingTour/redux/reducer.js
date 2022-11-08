import { createStore , combineReducers } from 'redux';
import customerReducer from './customerReducer';
import cartReducer from './cartReducer';



const reducer = combineReducers({
    idCustomer: customerReducer,
    cartAmount: cartReducer,
})
    // tao ra store
const store = createStore(reducer);

export default store;