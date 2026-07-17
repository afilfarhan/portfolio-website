'use client'

import dynamic from 'next/dynamic'

const StarfieldBackground = dynamic(() => import('@/StarfieldBackground').then(m => m.default), {
  ssr: false,
})

export default function StarfieldBackgroundClient() {
  return <StarfieldBackground />
}