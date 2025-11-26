import type { User } from '@/types/user'
import { fetchApi, normalizeToArray } from './apiHelpers'
import { handleError } from './errors'

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const data = await fetchApi('/api/users', { method: 'GET' })
    return normalizeToArray<User>(data)
  } catch (err) {
    throw handleError(err)
  }
}

