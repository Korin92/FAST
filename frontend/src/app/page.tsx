import styles from './page.module.scss'
import React from 'react'
import '../styles/globals.css'
import 'primereact/resources/themes/saga-blue/theme.css'

export default function Home(): React.ReactElement {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.text}>Nueva estructura frontend</div>
      </div>
    </main>
  )
}
