import { handleError, ServerError, ValidationError } from './errors'

const API_URL = '/api/auth/register'

interface RegisterResponse {
  token: string
  user: any
  message?: string
}

export async function registerApi(
  email: string, 
  password: string,
  firstname: string,
  lastname: string,
  role: string = "user"
): Promise<RegisterResponse> {
  try {
    if (!email || !password || !firstname || !lastname) {
      throw new ValidationError('Bütün sahələr məcburidir')
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstname, lastname, role }),
    })

    const responseText = await response.text()
    
    let data
    try {
      data = JSON.parse(responseText)
    } catch {
      throw new ServerError('Server JSON formatında cavab göndərmədi')
    }

    if (!response.ok) {
      throw new ServerError(data.message || 'Qeydiyyat zamanı xəta baş verdi')
    }

    if (!data.token || !data.user) {
      throw new ServerError('Token və ya user məlumatı tapılmadı')
    }

    return data
  } catch (error) {
    throw handleError(error)
  }
}
