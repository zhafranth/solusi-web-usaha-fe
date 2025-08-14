import { useState, useEffect } from 'react'

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      
      setScrollProgress(Math.min(scrollPercent, 100))
    }

    // Update on scroll
    window.addEventListener('scroll', updateScrollProgress)
    
    // Update on resize (in case content height changes)
    window.addEventListener('resize', updateScrollProgress)
    
    // Initial calculation
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <div className="fixed top-16 left-0 w-full h-1 bg-gray-200/50 z-40">
      <div 
        className="h-full bg-primary-blue transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ScrollProgressBar