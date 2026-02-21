import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Portfolio } from '@/components/sections/portfolio'
import { Suspense } from 'react'
import { Experience } from '@/components/sections/experience'
import { Education } from '@/components/sections/education'
import { Additional } from '@/components/sections/additional'
import { Contact } from '@/components/sections/contact'

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
