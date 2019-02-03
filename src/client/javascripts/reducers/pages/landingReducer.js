import * as ActionTypes from './landingActions'

export default function reducer(state = {
  data: null,
}, action) {
  switch (action.type) {
    case ActionTypes.LANDING_PAGE_GET_DATA.SUCCESS: {
      return { ...state, data: action.response }
    }

    default:
      return state
  }
}
