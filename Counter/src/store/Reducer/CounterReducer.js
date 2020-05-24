import * as actionTypes  from '../actions/Actions'
import {updateObject} from '../Util'

const initialState = {
  counter: 0 
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.INCREMENT:     
      return updateObject( state,  {counter: state.counter + 1})    
    case actionTypes.DECREMENT:
      return updateObject(state, { counter: state.counter - 1})  
    case actionTypes.ADDFIVE:
      return updateObject(state, {counter: state.counter+action.payload})
    case actionTypes.SUBFIVE:
      return {
        ...state,
        counter: state.counter - action.payload
      };
  
    default:
      return state;
  }
};

export default reducer;
