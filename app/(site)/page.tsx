import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Portfolio } from '@/components/portfolio'
import { Suspense } from 'react'
import { Experience } from '@/components/experience'
import { Education } from '@/components/education'
import { Additional } from '@/components/additional'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <main className="min-h-screen scroll-smooth overflow-x-hidden w-full pt-16">
      <Hero />
      <About />
      <Suspense fallback={null}>
        <Portfolio />
      </Suspense>
      <Experience />
      <Education />
      <Additional />
      <Contact />
    </main>
  )
}
