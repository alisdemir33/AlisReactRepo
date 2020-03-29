const initialState = {
  counter: 0,
  results: []//empty arry definition
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1
      };
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1
      };
    case "ADDFIVE":
      return {
        ...state,
        counter: state.counter + action.payload
      };
    case "SUBFIVE":
      return {
        ...state,
        counter: state.counter - action.payload
      };
    case "STORE":
      return {
        ...state,
        results: [...state.results, { id: new Date(), value: state.counter }]
      };

    case "DELETE":
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
