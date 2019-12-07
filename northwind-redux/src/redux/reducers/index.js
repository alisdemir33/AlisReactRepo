import {combineReducers} from 'redux';
import changeCategoryReducer from './changeCategoryReducer';
import changeCategoryListReducer from './categoryListReducer';
import productListReducer from './productListReducer';

const rootReducer= combineReducers({
   changeCategoryReducer,
   changeCategoryListReducer,
   productListReducer
})

export default rootReducer;