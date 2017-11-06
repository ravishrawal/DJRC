import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createLogger } from 'redux-logger'; creates too much noise in console
import thunkMiddleware from 'redux-thunk'

import bars from './bars'

const reducer = combineReducers({ bars });

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;