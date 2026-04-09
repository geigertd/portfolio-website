import { useEffect, useRef, useState } from 'react'

// Triggers a fade-in + slide-up animation when the element enters the viewport.
// Uses IntersectionObserver so it fires once and disconnects — no ongoing cost.
export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
