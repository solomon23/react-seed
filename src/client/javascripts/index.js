import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import '../stylesheets/vendor.scss'
import LandingComponent from './routes/landing/components/Landing'
import AppChrome from './components/App/Chrome'
import reducer from './reducers'
import sagas from './sagas'
import Unknown from './routes/unknown/Unknown.js'
import { routesArray } from './routes'
import config from '../../shared/config'

const preloadedState = {}
const sagaMiddleware = createSagaMiddleware()

const middleware = [
  thunkMiddleware,
  routerMiddleware(browserHistory),
  sagaMiddleware,
]

if (config.ENV !== 'PRODUCTION') {
  middleware.push(createLogger({ collapsed: true }))
}

// setup the store
const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
)

sagas(sagaMiddleware)

// setup the all the root routes and app chrome
const rootRoute = {
  childRoutes: [{
    path: '/',
    component: AppChrome,
    indexRoute: { component: LandingComponent },
    childRoutes: routesArray,
  }, {
    path: '*',
    component: Unknown,
  }],
}

const history = syncHistoryWithStore(browserHistory, store)

const renderPage = (parent) => {
  render((
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
      />
    </Provider>
  ), parent)
}

// look for our react app
const targetContainer = document.getElementById('react-wrapper')
if (targetContainer) {
  renderPage(targetContainer)
}
