import { useEffect, useRef, useState } from 'react'

const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing to prevent re-triggering
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.05, // Trigger when 5% of element is visible
        rootMargin: '0px 0px -20px 0px', // Trigger slightly before element comes into view
        ...options
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  return [elementRef, isVisible]
}

export default useScrollAnimation