const redux = require("redux");

const createStore = redux.createStore;

const initialState = {
  counter: 1
};
//reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1
    };
  }

  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};

//store
const store = createStore(rootReducer);
console.log('after store created', store.getState());

store.subscribe( () => {
    console.log('[Inside Subscription]' , store.getState());
})

console.log('After subscribe to store' , store.getState());

store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 5 });

console.log('After Dispatch!' , store.getState());

