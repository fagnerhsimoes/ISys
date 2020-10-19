import { createStore, applyMiddleware, compose } from 'redux';
import thunk       from 'redux-thunk'   ;
import promise     from 'redux-promise' ;
import multi       from 'redux-multi'   ;
import logger      from 'redux-logger'  ;

import rootReducer from './Index'       ;

const initialState = {};
const middleware = [ thunk, multi, promise, logger];

const Store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default Store;


