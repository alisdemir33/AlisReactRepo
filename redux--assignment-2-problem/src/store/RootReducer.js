import {combineReducers} from "redux"
import reducer from './reducer'

const rootReducer = combineReducers({
   personReducer: reducer
})

export default rootReducer;