import * as actionTypes  from './actions'

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.ADDPERSON:
      return {
        ...state,
        persons: [...state.persons, action.payload]
      };
    case actionTypes.DELETEPERSON:
      return {
        ...state,
        persons: state.persons.filter( (item)=> {
            if(item.id===action.payload)
            return false;
            else
            return true;
        })
      };
  
    default:
      return state;
  }
};

export default reducer;
