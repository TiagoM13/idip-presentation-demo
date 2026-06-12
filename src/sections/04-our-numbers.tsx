import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 04 — Nossos números
 * Figma: node 1:10304 (variant "04-01")
 * Label + heading top-left, 2×2 grid of stats below.
 */

const STATS: { value: string; lines: [string, string] }[] = [
  { value: '+600', lines: ['soluções', 'desenvolvidas'] },
  { value: '+120', lines: ['clientes', 'atendidos'] },
  { value: '+300%', lines: ['aumento de', 'performance'] },
  { value: '+20', lines: ['anos de', 'experiência'] },
]

export function OurNumbers() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Subtle glow (bottom-right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_88%_88%,rgba(0,90,180,0.16),transparent_70%)]"
      />

      <div className="absolute inset-0 flex flex-col px-[clamp(40px,5.2vw,100px)] pt-[clamp(48px,10vh,110px)]">
        {/* Label + heading */}
        <SectionTitle
          label="nossos números"
          title={
            <>
              Operação real,
              <br />
              métricas
              <br />
              verificáveis
            </>
          }
        />

        {/* Stats */}
        <div className="mt-[clamp(40px,8vh,96px)] grid w-fit grid-cols-2 gap-x-[clamp(48px,9vw,170px)] gap-y-[clamp(28px,5vh,56px)]">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col items-start">
              <p className="bg-linear-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold leading-none text-transparent text-[clamp(34px,3.4vw,64px)]">
                {s.value}
              </p>
              <p className="mt-[clamp(6px,0.8vw,14px)] leading-snug text-fog text-[clamp(15px,1.5vw,28px)]">
                {s.lines[0]}
                <br />
                {s.lines[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
