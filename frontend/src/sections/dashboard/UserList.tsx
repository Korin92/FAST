'use client'
import { User } from '@/modules/users/domain/User'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import React from 'react'

interface UserListProps {
  users: User[]
}
const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="card">
      <DataTable value={users} showGridlines tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre"></Column>
        <Column field="last_name" header="Apellidos"></Column>
        <Column field="street" header="Dirección"></Column>
      </DataTable>
    </div>
  )
}

export default UserList
