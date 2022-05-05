import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from "../reducers/authReducer";
import postReducer from '../reducers/postReducer';
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = createStore(
    combineReducers( {
        post: postReducer,
        auth: authReducer,
    }),
    applyMiddleware(
        ...middlewares
    )
);

export default store;