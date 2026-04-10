import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-[3px] z-40 origin-left bg-gradient-to-r from-primary-blue via-primary-green to-primary-blue"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgressBar
