const initialState = {
  counter: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1
      };
    case "DECREMENT":
      return {
        counter: state.counter - 1
      };
    case "ADDFIVE":
      return {
        counter: state.counter + action.payload
      };
    case "SUBFIVE":
      return {
        counter: state.counter - action.payload
      };
    default:
      return {
        counter:state.counter
      };
  }
};

export default reducer;
