import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 05 — O time
 * Figma: node 1:10305 / instance 1:10307 (variant "05-01")
 * Centered heading, Venn-style team diagram, tech checklist on the right.
 */

const STACK = [
  'Java',
  'Ruby',
  'Node',
  'Python',
  'dotNet',
  'React',
  'React Native',
  'Flutter',
]

export function Team() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Title */}
      <div className="absolute inset-x-0 top-[clamp(40px,8vh,100px)] px-[5%]">
        <SectionTitle
          align="center"
          label="o time"
          title="Time interno e multidisciplinar"
          subtitle="Sem terceirização do core técnico"
        />
      </div>

      {/* Venn diagram */}
      <div className="absolute left-1/2 top-[56%] aspect-square w-[clamp(360px,52vh,640px)] -translate-x-1/2 -translate-y-1/2">
        {/* Outer ring + glow */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/10 bg-[radial-gradient(closest-side,rgba(0,150,180,0.16),transparent_75%)]" />

        {/* Petals (overlapping circles) */}
        <div className="absolute left-1/2 top-0 aspect-square w-[58%] -translate-x-1/2 rounded-full border border-cyan-400/25 bg-[radial-gradient(closest-side,rgba(0,160,190,0.1),transparent)]" />
        <div className="absolute bottom-0 left-1/2 aspect-square w-[58%] -translate-x-1/2 rounded-full border border-cyan-400/25 bg-[radial-gradient(closest-side,rgba(0,160,190,0.1),transparent)]" />
        <div className="absolute left-0 top-1/2 aspect-square w-[58%] -translate-y-1/2 rounded-full border border-cyan-400/25 bg-[radial-gradient(closest-side,rgba(0,160,190,0.1),transparent)]" />
        <div className="absolute right-0 top-1/2 aspect-square w-[58%] -translate-y-1/2 rounded-full border border-cyan-400/25 bg-[radial-gradient(closest-side,rgba(0,160,190,0.1),transparent)]" />

        {/* Labels */}
        <p className="absolute left-1/2 top-[15%] -translate-x-1/2 bg-linear-to-b from-brand-cyan to-brand-blue bg-clip-text text-center font-bold uppercase leading-tight text-transparent text-[clamp(10px,1.04vw,20px)]">
          Desenvolvimento
        </p>
        <p className="absolute left-[7%] top-1/2 -translate-y-1/2 text-center font-bold uppercase leading-tight text-white text-[clamp(10px,1.04vw,20px)]">
          Produto &amp;
          <br />
          Projetos
        </p>
        <p className="absolute right-[6%] top-1/2 -translate-y-1/2 text-center font-bold uppercase leading-tight text-white text-[clamp(10px,1.04vw,20px)]">
          Arquitetura &amp;
          <br />
          Liderança
        </p>
        <p className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center font-bold uppercase leading-tight text-white text-[clamp(10px,1.04vw,20px)]">
          DevOps,
          <br />
          Dados &amp; IA
        </p>
      </div>

      {/* Connector line (Desenvolvimento → checklist) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[55%] top-[44%] h-px w-[22%] bg-linear-to-r from-brand-cyan/60 to-brand-cyan/0"
      />

      {/* Tech checklist */}
      <ul className="absolute right-[clamp(40px,8vw,150px)] top-1/2 flex -translate-y-1/2 flex-col gap-[clamp(2px,0.4vw,6px)] text-fog text-[clamp(15px,1.5vw,28px)]">
        {STACK.map((t) => (
          <li key={t} className="flex items-center gap-[0.5em]">
            <span className="text-brand-cyan">✓</span>
            {t}
          </li>
        ))}
      </ul>

      {/* Pagination dots */}
      <div className="absolute right-[1.6%] top-1/2 flex -translate-y-1/2 flex-col items-center gap-3.5">
        <span className="size-2.5 rounded-full bg-brand-cyan" />
        <span className="size-1.5 rounded-full bg-fog/30" />
        <span className="size-1.5 rounded-full bg-fog/30" />
        <span className="size-1.5 rounded-full bg-fog/30" />
      </div>
    </section>
  )
}
