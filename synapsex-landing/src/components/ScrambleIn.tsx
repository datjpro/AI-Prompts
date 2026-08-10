import React, { useState, useEffect } from 'react'

interface ScrambleInProps {
  text: string
  delay?: number
  triggered?: boolean
  className?: string
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><"

export const ScrambleIn: React.FC<ScrambleInProps> = ({
  text,
  delay = 0,
  triggered = true,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState<string>('')
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!triggered) {
      setHasStarted(false)
      setDisplayText('')
      return
    }

    const timer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [triggered, delay])

  useEffect(() => {
    if (!hasStarted) return

    let frame = 0
    const textLength = text.length

    const interval = setInterval(() => {
      frame++
      const revealIndex = Math.floor(frame * 0.5)

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
        } else if (i <= revealIndex + 3) {
          const randomChar = CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]
          result += randomChar
        } else {
          break
        }
      }

      setDisplayText(result)
    }, 25)

    return () => clearInterval(interval)
  }, [hasStarted, text])

  if (!hasStarted) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />
  }

  return <span className={className}>{displayText}</span>
}
