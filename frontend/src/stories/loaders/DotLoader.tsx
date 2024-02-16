import React from 'react'
import styles from './DotLoader.module.scss'

interface ButtonProps {
  backgroundColor?: string
}

export const DotLoader: React.FC<ButtonProps> = ({
  backgroundColor,
  ...props
}) => (
  <div className={styles.loader}>
    <div style={{ backgroundColor }} className={styles.dot}></div>
    <div style={{ backgroundColor }} className={styles.dot}></div>
    <div style={{ backgroundColor }} className={styles.dot}></div>
    <div style={{ backgroundColor }} className={styles.dot}></div>
    <div style={{ backgroundColor }} className={styles.dot}></div>
  </div>
)
