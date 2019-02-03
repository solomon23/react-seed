import React from 'react'
import styles from './styles/Error.scss'

const Error = () => (
  <div className={styles.loader}>
    <div id="pre-loader">
      <div className={styles.preLoader}>
        <i className="fa fa-exclamation-triangle" />
      </div>
    </div>
  </div>
)

export default Error
