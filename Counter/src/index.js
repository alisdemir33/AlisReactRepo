import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/Reducer/RootReducer'




const logger = store => {

    return next => {
        return action => {
            console.log('[Middleware] Dispatching ', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState())
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(logger,thunk)
  ));


//const store = createStore(rootReducer,  applyMiddleware(logger));

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
