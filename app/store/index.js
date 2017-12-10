import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import bars from './bars';
// import directions from './directions';
import genres from './genres';
import location from './location';
import owner from './owner';
import promos from './promos';
import reviews from './reviews';
// import sound from './sound';
import user from './user';

const reducer = combineReducers({ bars, genres, location, owner, promos, reviews, user });

const middleware = applyMiddleware(thunkMiddleware);

const store = createStore(reducer, middleware);

export default store;

export * from './bars';
export * from './genres';
export * from './directions';
export * from './location';
export * from './owner';
export * from './promos';
export * from './reviews';
// export * from './sound';
export * from './user';
