
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger  from 'redux-logger';
import thunkMiddleware from 'redux-thunk'

import bars from './bars'
import genres from './genres'
import user from './user'
import owner from './owner'
import reviews from './reviews'
import location from './location';

const reducer = combineReducers({ bars, genres, user, owner, reviews, location });


const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './bars';
export * from './location';
export * from './genres';
export * from './directions';
export * from './owner';
export * from './reviews';
