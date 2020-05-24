import {combineReducers} from "redux"
import reducer from './reducers/burgerBuilder'

const rootReducer = combineReducers({
   personReducer: reducer
})

export default rootReducer;