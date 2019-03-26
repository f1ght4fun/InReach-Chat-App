import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import chatReducer from './chat-reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  chat: chatReducer
})