import React from 'react'
import { Dashboard } from '@/sections/dashboard/Dashboard'
import { createApiUserRepo } from '@/modules/users/infra/ApiUserRepo'

export default async function Page() {
  const userRepository = createApiUserRepo()
  const users = await userRepository.getAll()

  return <Dashboard users={users.items} />
}
