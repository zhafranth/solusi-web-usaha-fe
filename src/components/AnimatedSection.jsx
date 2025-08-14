import useScrollAnimation from '../hooks/useScrollAnimation'

const AnimatedSection = ({ children, className = '', delay = 0, ...props }) => {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms'
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimatedSection