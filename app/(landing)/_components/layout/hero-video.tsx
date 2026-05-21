'use client'

import { useSyncExternalStore } from 'react'

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServer() {
  return false
}

export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  )

  if (reducedMotion) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
    )
  }

  return (
    <video
      src={src}
      className="absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
    />
  )
}
