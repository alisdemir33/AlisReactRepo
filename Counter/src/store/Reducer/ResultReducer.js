import * as actionTypes  from '../actions/Actions'

const initialState = {  
  results: []//empty arry definition
};

const reducer = (state = initialState, action) => {
  
    console.log(action);
  
  switch (action.type) {    
    case actionTypes.STORE:
      return {
        ...state,
        results: [...state.results, { id: new Date(), value: action.payload }]
      };

    case actionTypes.DELETE:
      {

        return {
          ...state,
          results: state.results.filter((item, index) => {
            if (item.id === action.payload)
              return false;
            else
              return true;
          })
        };
      }

    default:
      return state;
  }
};

export default reducer;