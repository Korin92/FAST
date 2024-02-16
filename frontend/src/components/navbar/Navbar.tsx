'use client'
import React from 'react'
import { Header } from '@/stories/headers/Header'
import Link from 'next/link'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <Header
      backgroundColor={`var(--primary-header-bg)`}
      onLogin={() => {}}
      onLogout={() => {}}
      onCreateAccount={() => {}}
    >
      <div className={styles.navbar}>
        <Link href={'/'}>Home</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
        <Link href={'/files'}>Archivos</Link>
      </div>
    </Header>
  )
}
