import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 07 — O que entregamos
 * Figma: node 1:10313 (variant "07-…")
 * Intro slide: centered label + heading + subtitle inside a soft radial glow, bottom grid.
 */
export function WhatWeDeliver() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Central glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(360px,46vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,120,180,0.28),rgba(0,80,150,0.1),transparent)]"
      />

      {/* Centered text */}
      <div className="relative z-10 px-[5%]">
        <SectionTitle
          align="center"
          size="lg"
          label="o que entregamos"
          title={
            <>
              Seis tipos
              <br />
              de soluções
            </>
          }
          subtitle="Todas sob demanda"
        />
      </div>
    </section>
  )
}
