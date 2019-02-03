import React from 'react'
import PropTypes from 'prop-types'
import Error from '../Error'
import styles from './styles/Chrome.scss'

const propTypes = {
  children: PropTypes.element,
  isFetching: PropTypes.bool,
  isError: PropTypes.string,
}

const AppChrome = ({ children, isFetching, isError }) => {
  if (isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div><Error /></div>
  }

  return (
    <div className={styles.chrome}>
      Chrome
      {children}
    </div>
  )
}

AppChrome.propTypes = propTypes
export default AppChrome
