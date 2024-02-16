import React, { useEffect, useState } from 'react'
import './toast.scss'

interface ToastProps {
  message?: string
  type?: 'error' | 'info' | 'success'
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (message) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 3000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [message])

  return (
    <div className={`toast toast-${type} ${show ? 'show' : ''}`}>{message}</div>
  )
}
