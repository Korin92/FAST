'use client'
import React, { useState } from 'react'
import { DragAndDrop } from '@/stories/drag-and-drop/DragAndDrop'
import { File } from '@/modules/files/domain/File'
import styles from './FileForm.module.scss'
import { Button } from '@/stories/buttons/generic-button/Button'
import { createApiFileRepo } from '@/modules/files/infra/ApiFileRepo'
import { DotLoader } from '@/stories/loaders/DotLoader'

export const FileForm: React.FC = () => {
  const fileRepository = createApiFileRepo()
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile({
        base64: '',
        id: '',
        mimeType: '',
        name: file.name,
        ownerID: '1',
        date: new Date(),
        extension: file.type,
      })
    }
  }
  const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.items

    if (droppedFiles) {
      const fileItem = Array.from(droppedFiles).find(
        (item) => item.kind === 'file',
      )
      if (fileItem) {
        const file = fileItem.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onloadend = function () {
            if (typeof reader.result === 'string') {
              const base64String = reader.result.replace(/^data:.+;base64,/, '')
              setFile({
                base64: base64String,
                id: crypto.randomUUID(),
                mimeType: '',
                name: file.name,
                ownerID: '1',
                date: new Date(),
                extension: file.type,
              })
            }
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const saveFile = () => {
    setIsLoading(true)
    if (!file) return
    fileRepository
      .create(file)
      .then(() => {
        console.log('File saved')
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error saving file:', error)
      })
  }
  return (
    <div className={styles.container}>
      <h1>Añadir archivo</h1>
      <DragAndDrop
        onChange={handleOnChange}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        text={file?.name ?? undefined}
      />
      <div className={styles.ButtonContainer}>
        {isLoading ? (
          <DotLoader />
        ) : (
          <Button
            backgroundColor="#2FA0EC"
            color="white"
            label="Subir archivo"
            onClick={saveFile}
            size="medium"
          />
        )}
      </div>
    </div>
  )
}
