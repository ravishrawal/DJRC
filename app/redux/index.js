
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger  from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

import bars from './bars'
import genres from './genres'
import user from './user'
import owner from './owner'

const reducer = combineReducers({ bars, genres, user, owner });


const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './bars';
export * from './genres';
export * from './directions';
export * from './owner';
