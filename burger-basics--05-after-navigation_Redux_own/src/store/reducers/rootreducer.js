import {combineReducers} from "redux"
import burgerReducerRef from './burgerBuilderReducer'

const rootReducer = combineReducers({
   burgerReducer: burgerReducerRef
})

export default rootReducer;