import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { moviesReducer } from '../reducers/moviesReducer.js'

export const store = createStore(moviesReducer, applyMiddleware(thunk))