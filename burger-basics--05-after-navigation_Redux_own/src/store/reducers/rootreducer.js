import {combineReducers} from "redux"
import burgerReducerRef from './burgerBuilderReducer'
import orderReducerRef from './orderReducer'
import authReducerRef from './authReducer'

const rootReducer = combineReducers({
   burgerReducer: burgerReducerRef,
   orderReducer:orderReducerRef,
   authReducer:authReducerRef

})

export default rootReducer;