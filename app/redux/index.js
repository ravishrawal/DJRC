
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

import bars from './bars'
import genres from './genres'
import directions from './directions'

const reducer = combineReducers({ bars, genres, directions });

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './bars';
export * from './genres';
export * from './directions';
