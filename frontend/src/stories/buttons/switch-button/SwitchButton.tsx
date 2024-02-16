import React from 'react'
import styles from './SwitchButton.module.scss'

interface ButtonProps {
  colorChecked?: string
  colorUnChecked?: string
  colorCircleFront?: string
  colorCircleBack?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const SwitchButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  colorChecked,
  colorUnChecked,
  colorCircleFront,
  colorCircleBack,
  ...props
}) => {
  const [isChecked, setIsChecked] = React.useState(false)

  const handleOnClick = () => {
    setIsChecked(!isChecked)
    if (onClick) {
      onClick()
    }
  }

  return (
    <label className={styles.switch}>
      <input type="checkbox" onClick={handleOnClick} />
      <div
        style={{ backgroundColor: isChecked ? colorChecked : colorUnChecked }}
        className={styles.slider}
      ></div>
      <div className={styles.sliderCard}>
        <div
          className={`${styles.sliderCardFace} ${styles.sliderCardFront}`}
          style={{ backgroundColor: colorCircleFront }}
        ></div>
        <div
          className={`${styles.sliderCardFace} ${styles.sliderCardBack}`}
          style={{ backgroundColor: colorCircleBack }}
        ></div>
      </div>
    </label>
  )
}
