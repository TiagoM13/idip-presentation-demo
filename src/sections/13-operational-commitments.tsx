import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 13 — Compromissos operacionais
 * Figma: node 1:10331 (variant "13")
 * Row of 6 cards (proportions 790 : 162×5, gap 24, total 1720 of 1920).
 * Card 1 is the "expanded" state — wide, strong teal glow, horizontal title +
 * description + icon. Cards 2–6 are "collapsed" — narrow, vertical rotated title
 * with the icon centered at the bottom. All static for now.
 */

type IconProps = { className?: string }

const svg = (className?: string) => ({
  className,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

function CodeIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
    </svg>
  )
}

function FileTextIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  )
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" />
    </svg>
  )
}

function MagnifyingGlassIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.6-4.6" />
    </svg>
  )
}

function SealCheckIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12l2.4 2.4 4.6-5" />
    </svg>
  )
}

function HeadsetIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M5 13v-1a7 7 0 0 1 14 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1" />
      <rect x="17" y="13" width="4" height="6" rx="1" />
      <path d="M19 19v.5a3 3 0 0 1-3 3h-2" />
    </svg>
  )
}

type Commitment = {
  title: string
  icon: (p: IconProps) => React.JSX.Element
  bright?: boolean
}

// Collapsed cards, left → right (after the wide card).
const COMMITMENTS: Commitment[] = [
  { title: 'Documentação técnica', icon: FileTextIcon },
  { title: 'LGPD e segurança', icon: ShieldIcon },
  { title: 'Cadência e transparência', icon: MagnifyingGlassIcon },
  { title: 'Garantia pós-entrega', icon: SealCheckIcon, bright: true },
  { title: 'Continuidade e suporte', icon: HeadsetIcon },
]

const CARD_BASE =
  'relative overflow-hidden rounded-lg border border-brand-blue bg-white/[0.04] shadow-glow backdrop-blur-md'
const ICON_CLASS =
  'size-full text-fog/75 drop-shadow-[0_0_8px_rgba(0,235,252,0.35)]'

export function OperationalCommitments() {
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
        {/* Expanded card */}
        <article className={`${CARD_BASE} flex-790`}>
          {/* Teal glow (Blur-Grande) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_85%_at_42%_78%,rgba(0,200,165,0.30),transparent_60%),radial-gradient(70%_55%_at_18%_60%,rgba(0,120,170,0.22),transparent_70%)]"
          />
          {/* Title (top-left) */}
          <p className="absolute right-[49.4%] top-[9.7%] whitespace-nowrap text-right font-bold text-fog text-[clamp(16px,1.45vw,28px)]">
            Propriedade do código
          </p>
          {/* Description (lower-right) */}
          <p className="absolute right-[8.2%] top-[76%] w-[48.6%] text-right leading-snug text-fog text-[clamp(13px,1.25vw,24px)]">
            Código entregue ao cliente em repositórios documentados
          </p>
          {/* Icon (bottom-left) */}
          <div className="absolute left-[10.6%] top-[87.3%] size-[clamp(28px,2.1vw,40px)] -translate-x-1/2 -translate-y-1/2">
            <CodeIcon className={ICON_CLASS} />
          </div>
        </article>

        {/* Collapsed cards */}
        {COMMITMENTS.map(({ title, icon: Icon, bright }) => (
          <article key={title} className={`${CARD_BASE} flex-162`}>
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${
                bright
                  ? 'bg-[radial-gradient(80%_55%_at_50%_45%,rgba(0,160,200,0.26),transparent_70%)]'
                  : 'bg-[radial-gradient(100%_60%_at_50%_100%,rgba(0,90,150,0.16),transparent_70%)]'
              }`}
            />
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
          </article>
        ))}
      </div>
    </section>
  )
}
