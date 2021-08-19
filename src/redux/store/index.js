// redux store
import { createStore, applyMiddleware, compose, combineReducers } from 'redux' // compose to use Redux DevTools

import { game_reducer } from '../reducers/game_reducer'
import { leaderboard_reducer } from '../reducers/leaderboard_reducer'

// Import the `thunk` middleware for async req
import thunk from 'redux-thunk'

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // to compose

const rootReducer = combineReducers({
  buzz: game_reducer,
  board: leaderboard_reducer
})

const store = createStore(rootReducer, storeEnhancers(applyMiddleware(thunk)))

export default store
