import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large'
  label: string
  color?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  onClick,
  children,
  label,
  size = 'medium',
  color,
  backgroundColor,
  ...props
}) => (
  <button
    onClick={onClick}
    {...props}
    type="button"
    className={[
      styles.storybookButton,
      styles[`storybookButton--${size}`],
      primary ? styles.storybookButtonPrimary : '',
    ].join(' ')}
    style={{ backgroundColor, color }}
  >
    {label}
    {children}
  </button>
)
