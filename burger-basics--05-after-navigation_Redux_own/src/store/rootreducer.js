import {combineReducers} from "redux"
import reducer from './reducers'

const rootReducer = combineReducers({
   personReducer: reducer
})

export default rootReducer;