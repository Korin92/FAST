'use client'
import UserList from '@/sections/dashboard/UserList'
import { User } from '@/modules/users/domain/User'
import React from 'react'
import styles from './Dashboard.module.scss'
import { Toast } from '@/stories/Toast'

interface DashboardProps {
  users: User[]
}
export const Dashboard: React.FC<DashboardProps> = ({ users }) => {
  return (
    <main>
      {!users ? (
        <Toast message={'ha habido un error'} type="error" />
      ) : (
        <div className={styles.container}>
          <div className={styles.listContainer}>
            <UserList users={users} />
          </div>
        </div>
      )}
    </main>
  )
}
