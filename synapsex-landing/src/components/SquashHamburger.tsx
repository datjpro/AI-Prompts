import React from 'react'
import { motion } from 'framer-motion'

interface SquashHamburgerProps {
  isOpen: boolean
  isMobile?: boolean
  className?: string
}

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({ 
  isOpen, 
  isMobile = false,
  className = "" 
}) => {
  const width = isMobile ? 15 : 18
  const height = isMobile ? 10 : 12
  const barHeight = isMobile ? 1.2 : 1.5
  const translateY = isMobile ? 4.4 : 5.25

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 20
  }

  return (
    <div 
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Top Bar */}
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
        style={{ height: `${barHeight}px`, top: 0 }}
        animate={{
          y: isOpen ? translateY : 0,
          rotate: isOpen ? 45 : 0
        }}
        transition={spring}
      />
      
      {/* Middle Bar */}
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
        style={{ height: `${barHeight}px`, top: `${translateY}px` }}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1
        }}
        transition={spring}
      />
      
      {/* Bottom Bar */}
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full block origin-center"
        style={{ height: `${barHeight}px`, top: `${translateY * 2}px` }}
        animate={{
          y: isOpen ? -translateY : 0,
          rotate: isOpen ? -45 : 0
        }}
        transition={spring}
      />
    </div>
  )
}
