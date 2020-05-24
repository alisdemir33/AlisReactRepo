import * as actionTypes  from '../actions/Actions'
import {updateObject} from '../Util'
import { deleteValue } from '../actions';

const initialState = {  
  results: []//empty arry definition
};


const deleteResult = (state,action) => {
  let deletedResults =  state.results.filter((item, index) => {
    if (item.id === action.payload)
      return false;
    else
      return true;
  });
  return updateObject( state, {results:deletedResults});

}

const reducer = (state = initialState, action) => {
  
    console.log(action);
  
  switch (action.type) {    
    case actionTypes.STORE:
    return updateObject(state, {results : [...state.results, {id: new Date() , value: action.payload}]})
     /*  return {
        ...state,
        results: [...state.results, { id: new Date(), value: action.payload }]
      }; */

    case actionTypes.DELETE:
     //V3 
    return deleteResult(state, action);
      //V2
    /*   let results =  state.results.filter((item, index) => {
          if (item.id === action.payload)
            return false;
          else
            return true;
        });
        return updateObject (state, results); */

        // V1
        /* return {
          ...state,
          results: state.results.filter((item, index) => {
            if (item.id === action.payload)
              return false;
            else
              return true;
          })
        }; */         
      

    default:
      return state;
  }
};

export default reducer;