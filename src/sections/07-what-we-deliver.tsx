/**
 * Section 07 — O que entregamos
 * Figma: node 1:10313 (variant "07-…")
 * Intro slide: centered label + heading + subtitle inside a soft radial glow, bottom grid.
 */
export function WhatWeDeliver() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-ink">
      {/* Central glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(360px,46vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,120,180,0.28),rgba(0,80,150,0.1),transparent)]"
      />

      {/* Bottom perspective grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] [perspective:600px]"
      >
        <div className="absolute inset-x-[-20%] bottom-0 top-0 origin-bottom [transform:rotateX(68deg)] [background-image:linear-gradient(to_right,rgba(120,160,190,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,190,0.1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      {/* Centered text */}
      <div className="relative z-10 flex flex-col items-center gap-[clamp(10px,1.4vw,24px)] px-[5%] text-center">
        <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
          o que entregamos
        </p>
        <h2 className="font-bold leading-tight text-fog text-[clamp(34px,4.2vw,80px)]">
          Seis tipos
          <br />
          de soluções
        </h2>
        <p className="font-normal leading-snug text-fog/70 text-[clamp(15px,1.5vw,28px)]">
          Todas sob demanda
        </p>
      </div>
    </section>
  )
}
