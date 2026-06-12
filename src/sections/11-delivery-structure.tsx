import { useEffect, useRef, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 11 — Estrutura de entrega
 * Figma: nodes 1:25355 / 1:25412 / 1:25444 / 1:25485 (animation frames)
 * Isometric diamond tower builds bottom-up — plays ONCE when the section
 * scrolls into view. Each step drops in, its text slides out and the connector
 * line grows to follow the text. Title stays fixed.
 */

type Step = { title: string; duration: string; desc: string }

// bottom → top
const STEPS: Step[] = [
  {
    title: 'Diagnóstico',
    duration: '1 a 2 semanas',
    desc: 'Mapeamento operacional, dores reais, stakeholders. Saída: documento de visão.',
  },
  {
    title: 'Planejamento',
    duration: '1 a 3 semanas',
    desc: 'Arquitetura, design, stack e backlog. Saída: proposta técnica e cronograma.',
  },
  {
    title: 'Desenvolvimento',
    duration: 'Sprints contínuos',
    desc: 'Execução em sprints quinzenais ou mensais, entregas no fim de cada ciclo.',
  },
  {
    title: 'Evolução contínua',
    duration: 'Recorrente',
    desc: 'Manutenção evolutiva, novas funcionalidades e suporte. Roadmap trimestral.',
  },
]

// Diamond outline (618×298) with ~8px rounded corners (quadratic joins).
const DIAMOND_PATH =
  'M298.1,11.1 Q309,6 319.9,11.1 L601.1,143.9 Q612,149 601.1,154.1 L319.9,286.9 Q309,292 298.1,286.9 L16.9,154.1 Q6,149 16.9,143.9 Z'

export function DeliveryStructure() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let started = false
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return
        started = true
        io.disconnect()
        setVisible(1) // first block appears on enter
        let n = 1
        const id = setInterval(() => {
          n += 1
          setVisible(n)
          if (n >= STEPS.length) clearInterval(id)
        }, 850)
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Shared diamond gradient */}
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <linearGradient id="diamondGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FCCE" />
            <stop offset="100%" stopColor="#0085DD" />
          </linearGradient>
        </defs>
      </svg>

      {/* Title */}
      <div className="absolute inset-x-0 top-[clamp(40px,9vh,110px)] z-20 px-[5%]">
        <SectionTitle
          align="center"
          label="Estrutura de entrega"
          title={
            <>
              Do diagnóstico à
              <br />
              evolução contínua
            </>
          }
        />
      </div>

      {/* Ambient glow (centred among the diamonds) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[62%] aspect-square w-[clamp(320px,34vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,150,195,0.3),transparent)] blur-2xl"
      />

      {/* Diagram zone */}
      <div className="absolute inset-x-0 bottom-[6%] top-[40%]">
        {STEPS.map((s, i) => {
          const revealed = i < visible
          return (
            <div
              key={s.title}
              className="absolute inset-x-[6%] flex items-center transition-opacity duration-700 ease-out"
              style={{
                bottom: `${i * 23}%`,
                zIndex: 10 - i,
                opacity: revealed ? 1 : 0,
              }}
            >
              {/* Diamond (overlaps neighbours vertically) */}
              <div
                className="relative aspect-618/298 w-[clamp(210px,23vw,450px)] shrink-0 transition-transform duration-700 ease-out"
                style={{ transform: revealed ? 'translateY(0)' : 'translateY(-40px)' }}
              >
                {/* Diamond fill — Figma: linear-gradient(180deg,#00FCCE,#0085DD), 8px rounded tips */}
                <svg
                  viewBox="0 0 618 298"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full opacity-20"
                >
                  <path d={DIAMOND_PATH} fill="url(#diamondGrad)" />
                </svg>
              </div>

              {/* Connector line (grows to follow the text) */}
              <div
                className="h-px shrink-0 bg-linear-to-r from-brand-cyan to-brand-blue transition-[width] duration-700 ease-out"
                style={{ width: revealed ? 'clamp(120px,14vw,320px)' : '0px' }}
              />

              {/* Title + duration */}
              <div
                className="ml-[clamp(20px,2vw,40px)] w-[clamp(150px,15vw,272px)] shrink-0 transition-transform duration-700 ease-out"
                style={{ transform: revealed ? 'translateX(0)' : 'translateX(-28px)' }}
              >
                <p className="font-bold leading-tight text-fog text-[clamp(16px,1.45vw,28px)]">
                  {s.title}
                </p>
                <p className="mt-[0.4em] italic leading-tight text-fog/70 text-[clamp(12px,1.15vw,24px)]">
                  {s.duration}
                </p>
              </div>

              {/* Vertical divider */}
              <div
                aria-hidden="true"
                className="mx-[clamp(20px,2.2vw,44px)] h-[clamp(54px,4.6vw,90px)] w-px shrink-0 self-center bg-linear-to-b from-brand-cyan to-brand-blue transition-opacity duration-700 ease-out"
                style={{ opacity: revealed ? 1 : 0 }}
              />

              {/* Description */}
              <p
                className="w-[clamp(220px,22vw,440px)] leading-snug text-fog text-[clamp(12px,1.25vw,28px)] transition-transform duration-700 ease-out"
                style={{ transform: revealed ? 'translateX(0)' : 'translateX(-28px)' }}
              >
                {s.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
