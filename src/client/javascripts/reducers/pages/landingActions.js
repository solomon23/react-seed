import { api } from '../../services'
import { createRequests, doApiCall, createRequestTypes } from '../actionHelper'

export const LANDING_PAGE_GET_DATA = createRequestTypes('LANDING_PAGE_GET_DATA')
export const landingPageGetDataActions = createRequests(LANDING_PAGE_GET_DATA)

export function getLandingPageData() {
  return doApiCall({
    api: api.getData,
    action: landingPageGetDataActions,
  })
}
