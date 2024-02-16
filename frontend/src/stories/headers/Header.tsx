import React, { useState } from 'react'

import { Button } from '../buttons/generic-button/Button'
import styles from './header.module.scss'
import aicrumitLogo from '../assets/aicrumit-logo.png'
import Image, { StaticImageData } from 'next/image'

interface User {
  name: string
}

interface HeaderProps {
  user?: User
  onLogin: () => void
  onLogout: () => void
  onCreateAccount: () => void
  image?: StaticImageData
  backgroundColor?: string
  avatarImage?: StaticImageData
  children?: React.ReactNode
}

export const Header = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount,
  image = aicrumitLogo,
  avatarImage,
  backgroundColor,
  children,
}: HeaderProps) => {
  const [showButtons, setShowButtons] = useState(false)

  return (
    <header>
      <div className={styles.storybookHeader} style={{ backgroundColor }}>
        <div>
          <Image src={image?.src} alt="aicrumit Logo" width={300} height={50} />
        </div>
        {children}
        <div>
          {user ? (
            <>
              <Image
                src={avatarImage?.src ?? ''}
                alt="User Avatar"
                style={{ borderRadius: '50%' }} // Hace que el avatar sea redondo
                onClick={() => {
                  setShowButtons(!showButtons)
                }} // Muestra/oculta los botones al hacer clic
              />
              {showButtons && ( // Muestra los botones si showButtons es true
                <>
                  <span className={styles.welcome}>
                    <b>{user.name}</b>!
                  </span>
                  <Button size="small" onClick={onLogout} label="Log out" />
                </>
              )}
            </>
          ) : (
            // Muestra los botones si showButtons es true
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button
                primary
                size="small"
                onClick={onCreateAccount}
                label="Sign up"
              />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
