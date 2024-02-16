import React from 'react'

import styles from './Login.module.scss'

export const Login: React.FC = () => {
  return (
    <div className={styles.board}>
      <div className={styles.CardLoginContainer}>
        <div className={styles.rectangle}>
          <div className={styles.logoPng}></div>
        </div>
      </div>
    </div>
  )
}
