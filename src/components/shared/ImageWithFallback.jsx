import { useEffect, useState } from 'react'

const DEFAULT_IMAGE = '/images/default-destination.jpg'

export default function ImageWithFallback({ src, alt, className = '', fallback = DEFAULT_IMAGE, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallback)

  useEffect(() => {
    setImgSrc(src || fallback)
  }, [src, fallback])

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback)
    }
  }

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
    />
  )
}
