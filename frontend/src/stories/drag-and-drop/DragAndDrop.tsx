import React from 'react'
import styles from './DragAndDrop.module.scss'
import DragAndDropIcon from '../assets/drag-and-drop.svg'
import Image from 'next/image'

interface DragAndDropProps {
  buttonColor?: string
  imageSrc?: string
  filter?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  onDrop?: (event: React.DragEvent<HTMLFormElement>) => void
  onDragOver?: (event: React.DragEvent<HTMLFormElement>) => void
  text?: string
}

export const DragAndDrop: React.FC<DragAndDropProps> = ({
  onChange,
  children,
  buttonColor,
  imageSrc,
  filter,
  onDrop,
  onDragOver,
  text,
  ...props
}) => {
  return (
    <form
      className={styles.fileUploadForm}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <label htmlFor="file" className={styles.fileUploadLabel}>
        <div className={styles.fileUploadDesign}>
          <Image
            className="dark:invert"
            src={imageSrc ?? DragAndDropIcon}
            alt={'drag and drop'}
            style={{
              filter:
                filter ??
                'brightness(0) saturate(100%) invert(55%) sepia(51%) saturate(2742%) hue-rotate(178deg) brightness(97%) contrast(90%)',
            }}
          />
          {text ? (
            <p className={styles.text}>{text}</p>
          ) : (
            <>
              <p>Drag and Drop</p>
              <p>or</p>
            </>
          )}
          <span
            className={styles.browseButton}
            style={{ backgroundColor: buttonColor }}
          >
            Browse file
          </span>
        </div>
        <input id="file" type="file" onChange={onChange} />
      </label>
    </form>
  )
}
