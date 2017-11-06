import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'; 
import thunkMiddleware from 'redux-thunk'

import bars from './bars'

const reducer = combineReducers({ bars });

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;