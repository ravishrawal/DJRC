
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger'; 
import thunkMiddleware from 'redux-thunk'

import bars from './bars'
import genres from './genres'

const reducer = combineReducers({ bars, genres });

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;