import { useRef, useLayoutEffect } from 'react'
import katex from 'katex'

export default function MathBlock({ math, display = false }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          throwOnError: false,
          displayMode: display,
        })
      } catch (e) {
        ref.current.textContent = math
      }
    }
  }, [math, display])

  return display
    ? <div ref={ref} className="m-block" />
    : <span ref={ref} className="m-inline" />
}
