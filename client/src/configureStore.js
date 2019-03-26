import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import {createSocketMiddleWare} from './socketMiddleware'
import setupReducer from './reducers'

export const history = createBrowserHistory()

export default function configureStore(config) {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    setupReducer(history),
    {},
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history), createSocketMiddleWare(config.serverUrl)
      ),
    ),
  )

  // Hot reloading
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(setupReducer(history));
    });
  }

  return store
} 