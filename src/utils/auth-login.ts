import { handleError, UnauthorizedError, ServerError, ValidationError } from './errors'

const API_URL = '/api/auth/login'

interface LoginResponse {
  token: string
  user: any
  message?: string
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    if (!email || !password) {
      throw new ValidationError('Email və şifrə məcburidir')
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const responseText = await response.text()
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      throw new ServerError('Server JSON formatında cavab göndərmədi')
    }

    if (!response.ok) {
      if (response.status === 401) {
        throw new UnauthorizedError(data.message || 'Email və ya şifrə yanlışdır')
      }
      throw new ServerError(data.message || 'Giriş uğursuz oldu')
    }

    if (!data.token || !data.user) {
      throw new ServerError('Token və ya user məlumatı tapılmadı')
    }

    return data
  } catch (error) {
    throw handleError(error)
  }
}
