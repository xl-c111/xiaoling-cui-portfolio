import { Portfolio } from '@/components/sections/portfolio'
import { Suspense } from 'react'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-16">
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
    </main>
  )
}
