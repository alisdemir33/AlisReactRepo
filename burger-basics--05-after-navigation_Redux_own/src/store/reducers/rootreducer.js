import {combineReducers} from "redux"
import burgerReducerRef from './burgerBuilderReducer'
import orderReducerRef from './orderReducer'

const rootReducer = combineReducers({
   burgerReducer: burgerReducerRef,
   orderReducer:orderReducerRef

})

export default rootReducer;