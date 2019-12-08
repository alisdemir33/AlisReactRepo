import {combineReducers} from 'redux';
import changeCategoryReducer from './changeCategoryReducer';
import changeCategoryListReducer from './categoryListReducer';
import productListReducer from './productListReducer';
import cartReducer from './cartReducer';

const rootReducer= combineReducers({
   changeCategoryReducer,
   changeCategoryListReducer,
   productListReducer,
   cartReducer
})

export default rootReducer;