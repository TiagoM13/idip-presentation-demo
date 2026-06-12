import { useEffect, useRef, useState } from 'react'
import { Cover } from './sections/01-cover'
import { Letter } from './sections/02-letter'
import { WhoWeAre } from './sections/03-who-we-are'
import { OurNumbers } from './sections/04-our-numbers'
import { Team } from './sections/05-team'
import { HowWeWork } from './sections/06-how-we-work'
import { WhatWeDeliver } from './sections/07-what-we-deliver'
import { WhereWeOperate } from './sections/08-where-we-operate'
import { SuccessCase } from './sections/09-success-case'
import { Portfolio } from './sections/10-portfolio'
import { DeliveryStructure } from './sections/11-delivery-structure'
import { ExpectedResults } from './sections/12-expected-results'
import { OperationalCommitments } from './sections/13-operational-commitments'
import { Contact } from './sections/14-contact'

function App() {
  // Sections 5–10 share a perspective floor grid ("malha") that, like the
  // background, stays fixed while only the content scrolls. We render it once
  // as a fixed layer and fade it in only while that block of sections is on screen.
  const gridZoneRef = useRef<HTMLDivElement>(null)
  const [gridVisible, setGridVisible] = useState(false)

  useEffect(() => {
    const el = gridZoneRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setGridVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* Global background — fixed, so it stays still while the sections scroll over it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-ink bg-[url('/images/background_01.png')] bg-cover bg-center bg-no-repeat"
      />
      {/* Perspective floor grid — fixed in the background, only across sections 5–10. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 -bottom-36 -z-10 h-[50%] bg-[url('/images/background_malha.svg')] bg-contain bg-bottom bg-no-repeat transition-opacity duration-500 ${gridVisible ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <main className="relative flex flex-col">
        {/* Single page. Each <section> is a "session" of the presentation. */}
        <Cover />
        <Letter />
        <WhoWeAre />
        <OurNumbers />
        {/* Sections 5–10 — share the fixed malha floor (observed as one block). */}
        <div ref={gridZoneRef}>
          <Team />
          <HowWeWork />
          <WhatWeDeliver />
          <WhereWeOperate />
          <SuccessCase />
          <Portfolio />
        </div>
        <DeliveryStructure />
        <ExpectedResults />
        <OperationalCommitments />
        <Contact />
      </main>
    </>
  )
}

export default App
