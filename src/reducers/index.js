import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'

export default combineReducers(
    {
        auth : AuthReducer
        // second
    }

) 


// {
//     cust : Costumer,
//     comp : Complain,
//     mon : Money
// }