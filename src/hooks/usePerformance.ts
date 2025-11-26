import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  apiCallCount: number
  cacheHitRate: number
}

// Hook for monitoring component performance
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = useRef<number>(Date.now())
  const apiCalls = useRef<number>(0)
  const cacheHits = useRef<number>(0)

  // Monitoring load time and rendering
  useEffect(() => {
    const loadTime = Date.now() - startTime.current
    console.log(`${componentName} loaded in ${loadTime}ms`)

    return () => {
      const totalTime = Date.now() - startTime.current
      const cacheHitRate = apiCalls.current > 0 ? (cacheHits.current / apiCalls.current) * 100 : 0

      console.log(`${componentName} Performance Metrics:`, {
        totalTime: `${totalTime}ms`,
        apiCalls: apiCalls.current,
        cacheHitRate: `${cacheHitRate.toFixed(1)}%`
      })
    }
  }, [componentName])

  const trackApiCall = (fromCache = false) => {
    apiCalls.current++
    if (fromCache) cacheHits.current++
  }

  return { trackApiCall }
}
