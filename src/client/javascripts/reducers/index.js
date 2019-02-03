import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { loadingReducer, errorReducer } from './loadingReducer'
import landing from './pages/landingReducer'

const pages = combineReducers({
  landing,
})

export default combineReducers({
  pages,
  loading: loadingReducer,
  error: errorReducer,
  routing: routerReducer,
})
