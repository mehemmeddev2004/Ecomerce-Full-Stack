import { handleError, ServerError } from './errors'

interface BatchRequest {
  id: string
  url: string
  options?: RequestInit
}

interface BatchResponse<T = any> {
  id: string
  data?: T
  error?: Error
  status: 'success' | 'error'
}

export const batchRequests = async <T = any>(
  requests: BatchRequest[],
  maxConcurrency = 5
): Promise<BatchResponse<T>[]> => {
  try {
    const results: BatchResponse<T>[] = []
    const executing: Promise<void>[] = []

    for (const request of requests) {
      const promise = executeRequest(request).then((result) => {
        results.push(result)
      })

      executing.push(promise)

      if (executing.length >= maxConcurrency) {
        await Promise.race(executing)
        executing.splice(executing.findIndex(p => p === promise), 1)
      }
    }

    await Promise.all(executing)
    return results
  } catch (error) {
    throw handleError(error)
  }
}

const executeRequest = async <T = any>(request: BatchRequest): Promise<BatchResponse<T>> => {
  try {
    const response = await fetch(request.url, {
      ...request.options,
      headers: {
        'Content-Type': 'application/json',
        ...request.options?.headers,
      },
    })

    if (!response.ok) {
      throw new ServerError(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      id: request.id,
      data,
      status: 'success'
    }
  } catch (error) {
    return {
      id: request.id,
      error: error instanceof Error ? error : new Error('Bilinməyən xəta'),
      status: 'error'
    }
  }
}

export const fetchParallel = async <T extends Record<string, any>>(
  requests: Record<keyof T, () => Promise<any>>
): Promise<T> => {
  try {
    const keys = Object.keys(requests) as (keyof T)[]
    const promises = keys.map(key => 
      requests[key]().catch((error: Error) => ({ error, key }))
    )

    const results = await Promise.all(promises)
    const data = {} as T

    results.forEach((result, index) => {
      const key = keys[index]
      if (result && typeof result === 'object' && 'error' in result) {
        data[key] = undefined as T[keyof T]
      } else {
        data[key] = result
      }
    })

    return data
  } catch (error) {
    throw handleError(error)
  }
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
