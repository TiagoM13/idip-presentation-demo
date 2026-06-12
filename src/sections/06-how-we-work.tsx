import { SectionTitle } from '../components/SectionTitle'

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
    <section className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Center glow behind cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_40%_at_50%_58%,rgba(0,120,170,0.16),transparent_70%)]"
      />

      {/* Title */}
      <div className="relative z-10 px-[5%] pt-[clamp(36px,7vh,88px)]">
        <SectionTitle
          align="center"
          label="Como trabalhamos"
          title={
            <>
              Cinco pilares aplicados em
              <br />
              todos os projetos
            </>
          }
        />
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
