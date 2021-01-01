import * as actionTypes  from '../Actions'

const initialState = {
  counter: 0 
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.ADDFIVE:
      return {
        ...state,
        counter: state.counter + action.payload
      };
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
