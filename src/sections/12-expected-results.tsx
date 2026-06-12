import { useEffect, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { Pagination } from '../components/Pagination'

/**
 * Section 12 — Resultados esperados
 * Figma: nodes 1:25578 / 1:25637 / 1:25657 (variants "12-01/02/03")
 * Heading + neon icon + benefits column on the right. The icon and the column
 * cycle through 3 slides automatically (infinite loop, generous reading time);
 * the right-edge pagination follows the active slide.
 */

type Slide = { icon: string; label: string; items: [string, string, string] }

const SLIDES: Slide[] = [
  {
    icon: '/images/12_icon01.svg',
    label: 'Eficiência operacional',
    items: [
      'Aumento de produtividade nos fluxos críticos',
      'Redução de retrabalho e processos manuais',
      'Automação de aprovações e atendimentos',
    ],
  },
  {
    icon: '/images/12_icon02.svg',
    label: 'Gestão e inteligência',
    items: [
      'Centralização de informações dispersas',
      'Controle gerencial via dashboards',
      'Inteligência para tomada de decisão',
    ],
  },
  {
    icon: '/images/12_icon03.svg',
    label: 'Escala e experiência',
    items: [
      'Crescimento sem aumento proporcional de custo',
      'Melhoria mensurável da experiência do usuário',
      'Capacidade de escala sem dor técnica',
    ],
  },
]

// Generous dwell so the reader can finish each slide before it advances.
const SLIDE_MS = 6500

export function ExpectedResults() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    )
    return () => clearInterval(id)
  }, [])

  const slide = SLIDES[active]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Blur orb (centre) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(320px,34vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,140,190,0.32),rgba(0,80,150,0.1),transparent)] blur-2xl"
      />

      {/* Neon icon (centre) — swaps per slide */}
      <img
        key={slide.icon}
        src={slide.icon}
        alt=""
        aria-hidden="true"
        className="animate-slide-fade absolute left-1/2 top-1/2 w-[clamp(120px,11vw,200px)] -translate-x-1/2 -translate-y-1/2"
      />

      {/* Heading (left) */}
      <div className="absolute left-[clamp(40px,5.2vw,100px)] top-1/2 w-[clamp(300px,30vw,540px)] -translate-y-1/2">
        <SectionTitle
          label="Resultados esperados"
          title={
            <>
              Software
              <br />
              entregue é etapa,
              <br />
              não resultado
            </>
          }
        />
      </div>

      {/* Benefits column (right) — swaps per slide */}
      <div className="absolute right-[clamp(60px,10.4vw,200px)] top-1/2 w-[clamp(280px,23vw,440px)] -translate-y-1/2">
        <div key={active} className="animate-slide-fade">
          <p className="bg-brand-gradient bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
            {slide.label}
          </p>
          <ul className="mt-[clamp(16px,1.6vw,30px)] flex flex-col gap-[clamp(14px,1.5vw,28px)]">
            {slide.items.map((b) => (
              <li
                key={b}
                className="flex gap-[0.5em] leading-snug text-fog text-[clamp(15px,1.45vw,28px)]"
              >
                <span className="text-fog">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagination (right edge) */}
      <Pagination
        count={SLIDES.length}
        active={active}
        orientation="vertical"
        className="absolute right-[clamp(24px,5.4vw,104px)] top-1/2 -translate-y-1/2"
      />
    </section>
  )
}
