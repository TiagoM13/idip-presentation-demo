/**
 * Section 06 — Como trabalhamos
 * Figma: node 1:10310 (variant "06-02")
 * Centered heading + row of 5 overlapping circular pillar cards.
 */

const PILLARS: { n: string; title: [string, string]; desc: string }[] = [
  { n: '01', title: ['Visão de', 'negócio'], desc: 'Cada decisão técnica tem justificativa operacional por trás' },
  { n: '02', title: ['Estruturação', 'operacional'], desc: 'Organizamos fluxos e integrações antes mesmo de programar' },
  { n: '03', title: ['Arquitetura', 'escalável'], desc: 'Projetos desenhados para crescer sem dor técnica' },
  { n: '04', title: ['Tecnologia +', 'estratégia'], desc: 'Stack escolhida em função do problema, não da moda' },
  { n: '05', title: ['Relacionamento', 'próximo'], desc: 'Pontos focais nominais e cadência previsível' },
]

export function HowWeWork() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-ink">
      {/* Center glow behind cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_58%,rgba(0,120,170,0.16),transparent_70%)]"
      />

      {/* Bottom perspective grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] [perspective:600px]"
      >
        <div className="absolute inset-x-[-20%] bottom-0 top-0 origin-bottom [transform:rotateX(68deg)] [background-image:linear-gradient(to_right,rgba(120,160,190,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,190,0.1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      {/* Title */}
      <div className="relative z-10 flex flex-col items-center gap-[clamp(8px,1.2vw,20px)] px-[5%] pt-[clamp(36px,7vh,88px)] text-center">
        <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
          Como trabalhamos
        </p>
        <h2 className="font-bold leading-tight text-fog text-[clamp(26px,3.1vw,60px)]">
          Cinco pilares aplicados em
          <br />
          todos os projetos
        </h2>
      </div>

      {/* Pillar cards */}
      <div
        className="relative z-10 flex flex-1 items-center justify-center pb-[clamp(32px,7vh,80px)]"
        style={{ ['--c' as string]: 'min(27vw, 50vh)' }}
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.n}
            className="relative aspect-square w-(--c) shrink-0 rounded-full bg-black/40 backdrop-blur-md"
            style={i === 0 ? undefined : { marginLeft: 'calc(var(--c) * -0.42)' }}
          >
            {/* Inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_45%_at_38%_26%,rgba(0,160,190,0.14),transparent_70%)]"
            />
            {/* Content */}
            <div className="absolute left-[15%] top-1/2 flex w-[44%] -translate-y-1/2 flex-col gap-[clamp(8px,1.3vh,22px)]">
              <span className="flex aspect-square w-[clamp(38px,3.1vw,60px)] items-center justify-center rounded-2xl border border-brand-cyan bg-[#101114] font-bold text-white text-[clamp(13px,1.2vw,22px)]">
                {p.n}
              </span>
              <h3 className="font-bold leading-tight text-fog text-[clamp(14px,1.4vw,26px)]">
                {p.title[0]}
                <br />
                {p.title[1]}
              </h3>
              <span aria-hidden="true" className="h-px w-[clamp(48px,4vw,78px)] bg-linear-to-r from-brand-cyan to-brand-blue" />
              <p className="font-normal leading-snug text-fog text-[clamp(11px,1.05vw,20px)]">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
