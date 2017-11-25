
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger  from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

import bars from './bars'
import genres from './genres'
import user from './user'

const reducer = combineReducers({ bars, genres, user });


const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './bars';
export * from './genres';
export * from './directions';
