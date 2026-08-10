import React, { useState, useEffect } from 'react'

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><"

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  isHovered,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState<string>(text)

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text)
      return
    }

    let frame = 0
    const textLength = text.length

    const interval = setInterval(() => {
      frame++
      const revealIndex = Math.floor(frame / 4)

      if (revealIndex >= textLength) {
        setDisplayText(text)
        clearInterval(interval)
        return
      }

      let result = ''
      for (let i = 0; i < textLength; i++) {
        if (text[i] === ' ') {
          result += ' '
        } else if (i < revealIndex) {
          result += text[i]
        } else {
          const randomChar = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
          result += randomChar
        }
      }

      setDisplayText(result)
    }, 25)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span className={className}>{displayText}</span>
}
