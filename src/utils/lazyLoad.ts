import dynamic from 'next/dynamic'

export const lazyLoadComponent = (
  importFunc: any,
  options?: {
    ssr?: boolean
  }
) => {
  return dynamic(importFunc, {
    ssr: options?.ssr ?? true
  })
}

export const lazyLoadWithDelay = (
  importFunc: any,
  delay: number = 300
) => {
  return dynamic(
    async () => {
      await new Promise(resolve => setTimeout(resolve, delay))
      return importFunc()
    },
    { ssr: false }
  )
}
