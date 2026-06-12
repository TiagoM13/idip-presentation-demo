import { useState } from 'react'
import type { Icon } from '@phosphor-icons/react'
import {
  CodeIcon,
  FileTextIcon,
  ShieldIcon,
  MagnifyingGlassIcon,
  SealCheckIcon,
  HeadsetIcon,
} from '@phosphor-icons/react'
import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 13 — Compromissos operacionais
 * Figma: node 1:10331 (variant "13")
 * Row of 6 cards (proportions 790 : 162×5, gap 24, total 1720 of 1920).
 * One card is expanded (wide — horizontal title + description + icon, teal glow),
 * the rest collapsed (narrow — vertical rotated title + icon at the bottom).
 * Clicking a card expands it and collapses the others, with a smooth grow/shrink.
 * The expanded text sits in a fixed-width panel so it is revealed by the card
 * widening (clipped) instead of reflowing/breaking mid-animation.
 */

type Commitment = {
  title: string
  desc: string
  icon: Icon
  bright?: boolean
}

// Cards, left → right.
const COMMITMENTS: Commitment[] = [
  {
    title: 'Propriedade do código',
    desc: 'Código entregue ao cliente em repositórios documentados',
    icon: CodeIcon,
  },
  {
    title: 'Documentação técnica',
    desc: 'Arquitetura, APIs e fluxos fazem parte do escopo',
    icon: FileTextIcon,
  },
  {
    title: 'LGPD e segurança',
    desc: 'Proteção de dados desde o desenho da solução',
    icon: ShieldIcon,
  },
  {
    title: 'Cadência e transparência',
    desc: 'Correção de bugs após go-live, sem custo adicional',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'Garantia pós-entrega',
    desc: 'Correção de bugs após go-live, sem custo adicional',
    icon: SealCheckIcon,
    bright: true,
  },
  {
    title: 'Continuidade e suporte',
    desc: 'Estrutura de manutenção evolutiva com pontos focais',
    icon: HeadsetIcon,
  },
]

const CARD_BASE =
  'group relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-lg border border-brand-blue bg-white/[0.04] shadow-glow backdrop-blur-md transition-[flex-grow] duration-500 ease-out'
const ICON_CLASS = 'size-full text-fog/75 drop-shadow-[0_0_8px_rgba(0,235,252,0.35)]'

export function OperationalCommitments() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden px-[clamp(40px,5.2vw,100px)] pb-[clamp(32px,7vh,78px)] pt-[clamp(40px,15vh,170px)]">
      {/* Ambient section glow (Figma left blur) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[10%] aspect-square w-[clamp(280px,30vw,560px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,150,150,0.18),transparent)] blur-2xl"
      />

      {/* Title */}
      <div className="relative z-10 mb-[clamp(20px,3.5vh,40px)] shrink-0">
        <SectionTitle
          label="Compromissos operacionais"
          title={
            <>
              O que garantimos
              <br />
              em todo projeto
            </>
          }
        />
      </div>

      {/* Card row — proportions match Figma (790 : 162×5) */}
      <div className="relative z-10 flex min-h-0 flex-1 gap-[clamp(10px,1.25vw,24px)]">
        {COMMITMENTS.map(({ title, desc, icon: Icon, bright }, i) => {
          const isActive = i === active
          return (
            <article
              key={title}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              style={{ flexGrow: isActive ? 790 : 162 }}
              className={CARD_BASE}
            >
              {/* Expanded glow (teal) */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_42%_78%,rgba(0,200,165,0.30),transparent_60%),radial-gradient(70%_55%_at_18%_60%,rgba(0,120,170,0.22),transparent_70%)] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'
                  }`}
              />
              {/* Collapsed glow */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${bright
                  ? 'bg-[radial-gradient(80%_55%_at_50%_45%,rgba(0,160,200,0.26),transparent_70%)]'
                  : 'bg-[radial-gradient(100%_60%_at_50%_100%,rgba(0,90,150,0.16),transparent_70%)]'
                  } ${isActive ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* Drifting glow — slow wave across the card background */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div
                  className="absolute left-1/2 top-1/2 size-[90%] rounded-full bg-brand-gradient opacity-25 blur-2xl motion-safe:animate-card-wave"
                  style={{ animationDelay: `${-i * 2.6}s` }}
                />
              </div>

              {/* Expanded content — fixed width, anchored left, revealed by the
                  card widening (the card clips it) so the text never reflows. */}
              <div
                className={`absolute inset-y-0 left-0 w-[clamp(420px,41vw,790px)] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
              >
                {/* Title (top-left) */}
                <p className="absolute right-[49.4%] top-[9.7%] whitespace-nowrap text-right font-bold text-fog text-[clamp(16px,1.45vw,28px)]">
                  {title}
                </p>
                {/* Description (lower-right) */}
                <p className="absolute right-[8.2%] top-[76%] w-[48.6%] text-right leading-snug text-fog text-[clamp(13px,1.25vw,24px)]">
                  {desc}
                </p>
                {/* Icon (bottom-left) */}
                <div className="absolute left-[10.6%] top-[87.3%] size-[clamp(28px,2.1vw,40px)] -translate-x-1/2 -translate-y-1/2">
                  <Icon className={ICON_CLASS} />
                </div>
              </div>

              {/* Collapsed content */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'pointer-events-none opacity-0' : 'opacity-100 delay-150'
                  }`}
              >
                {/* Vertical title */}
                <div className="absolute inset-x-0 bottom-[24%] top-[8%] flex items-center justify-center">
                  <p className="-rotate-90 whitespace-nowrap text-center font-bold text-fog text-[clamp(15px,1.45vw,28px)]">
                    {title}
                  </p>
                </div>
                {/* Icon (bottom-center) */}
                <div className="absolute left-1/2 top-[87.3%] size-[clamp(28px,2.1vw,40px)] -translate-x-1/2 -translate-y-1/2">
                  <Icon className={ICON_CLASS} />
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
