import {combineReducers} from "redux"
import CounterReducer from './CounterReducer'
import ResultReducer from './ResultReducer'

const rootReducer = combineReducers({
    ctrReducer: CounterReducer,
    resultReducer: ResultReducer   
})

export default rootReducer;