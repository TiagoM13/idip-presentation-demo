/**
 * Section 03 — Quem somos
 * Figma: node 1:10301 (variant "03-01")
 * Hand reaching a glowing orb, with label + heading bottom-left and paragraphs bottom-right.
 */
export function WhoWeAre() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0a0d12]">
      {/* Glowing orb (top-center) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[47%] top-[13%] aspect-square w-[clamp(150px,17vw,300px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,215,225,0.45),rgba(0,150,205,0.16),transparent)] [box-shadow:0_0_120px_40px_rgba(0,185,215,0.22)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[47%] top-[13%] aspect-square w-[clamp(150px,17vw,300px)] -translate-x-1/2 rounded-full border border-cyan-300/25"
      />

      {/* Hand */}
      <img
        src="/assets/mao.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[47%] h-[80%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#0a0d12] via-[#0a0d12]/85 to-transparent"
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-[4%] px-[clamp(24px,5.2vw,100px)] pb-[clamp(40px,8.5vh,96px)]">
        <div className="max-w-[44%]">
          <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
            quem somos
          </p>
          <h2 className="mt-[clamp(12px,1.4vw,24px)] font-bold leading-tight text-fog text-[clamp(30px,3.35vw,64px)]">
            Software house
            <br />
            B2B com atuação nacional
          </h2>
        </div>

        <div className="flex max-w-[36%] flex-col gap-[1em] leading-snug text-fog/90 text-[clamp(14px,1.5vw,28px)]">
          <p>
            Construímos sistemas que organizam operações descentralizadas,
            automatizam processos manuais e conectam sistemas que hoje não
            conversam.
          </p>
          <p>
            Não entregamos apenas software, mas transformação operacional com
            impacto mensurável.
          </p>
        </div>
      </div>
    </section>
  )
}
