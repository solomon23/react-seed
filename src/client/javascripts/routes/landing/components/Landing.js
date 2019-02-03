import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createLoadingSelector, createErrorMessageSelector } from '../../../reducers/selectors'
import * as landingActions from '../../../reducers/pages/landingActions'

const propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  getLandingPageData: PropTypes.func.isRequired,
}

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getLandingPageData()
  }

  render() {
    const { data, isFetching } = this.props

    if (isFetching || !data) {
      return <div>Loading...</div>
    }

    return (
      <div>
        Landing Page {data.message}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loadingSelector = createLoadingSelector([landingActions.LANDING_PAGE_GET_DATA.SELF])
  const errorSelector = createErrorMessageSelector([landingActions.LANDING_PAGE_GET_DATA.SELF])
  const data = state.pages.landing.data

  return { ...state, isFetching: loadingSelector(state), errorMessage: errorSelector(state), data }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...landingActions }, dispatch)
}

LandingPage.propTypes = propTypes
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
