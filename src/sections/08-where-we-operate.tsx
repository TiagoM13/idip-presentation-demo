/**
 * Section 08 — Onde atuamos
 * Figma: node 1:10316 (variant "08-01")
 * Heading + active sector (left), neon heartbeat icon inside a ring of sector labels (right).
 */

const SECTORS = [
  'Healthtech',
  'Logística & Suprimentos',
  'Agro',
  'Gestão & Serviços',
  'Plataformas SaaS',
  'Governo & Terceiro Setor',
]

export function WhereWeOperate() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      {/* Bottom perspective grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] [perspective:600px]"
      >
        <div className="absolute inset-x-[-20%] bottom-0 top-0 origin-bottom [transform:rotateX(68deg)] [background-image:linear-gradient(to_right,rgba(120,160,190,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,190,0.1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      {/* Heading (top-left) */}
      <div className="absolute left-[clamp(40px,5.2vw,100px)] top-[clamp(48px,16vh,200px)] w-[clamp(300px,30vw,460px)]">
        <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
          Onde atuamos
        </p>
        <h2 className="mt-[clamp(12px,1.4vw,24px)] font-bold leading-tight text-fog text-[clamp(30px,3.35vw,64px)]">
          Software não pode ser genérico
        </h2>
      </div>

      {/* Active sector (bottom-left) */}
      <div className="absolute bottom-[clamp(90px,16vh,200px)] left-[clamp(40px,5.2vw,100px)] w-[clamp(300px,30vw,440px)]">
        <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
          Healthtech
        </p>
        <p className="mt-[clamp(12px,1.4vw,24px)] leading-snug text-fog text-[clamp(15px,1.5vw,28px)]">
          Gestão clínica, prontuário eletrônico, agendamento, telemedicina e LGPD
          para dados sensíveis
        </p>
      </div>

      {/* Pagination dots (bottom-left) */}
      <div className="absolute bottom-[clamp(40px,7vh,80px)] left-[clamp(40px,5.2vw,100px)] flex items-center gap-[16px]">
        <span className="size-[10px] rounded-full bg-brand-cyan" />
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="size-[6px] rounded-full bg-fog/30" />
        ))}
      </div>

      {/* Ring + neon icon (center-right) */}
      <div
        className="absolute left-[62%] top-1/2 aspect-square w-[clamp(420px,46vw,700px)] -translate-x-1/2 -translate-y-1/2"
        style={{ ['--r' as string]: 'clamp(190px,21vw,315px)' }}
      >
        {/* Glow behind icon (ring-shaped: darker center for icon contrast) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(0,90,150,0.18)_18%,rgba(0,140,190,0.34)_50%,transparent_78%)]"
        />
        {/* Ring circle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full border border-cyan-400/15"
        />

        {/* Circular sector labels */}
        {SECTORS.map((s, i) => (
          <span
            key={s}
            className={`absolute left-1/2 top-1/2 whitespace-nowrap font-bold uppercase tracking-wide text-[clamp(11px,1.05vw,18px)] ${
              i === 0 ? 'text-brand-cyan' : 'text-fog/45'
            }`}
            style={{
              transform: `translate(-50%,-50%) rotate(${i * 60}deg) translateY(calc(var(--r) * -1))`,
            }}
          >
            {s}
          </span>
        ))}

        {/* Neon heartbeat icon */}
        <svg
          viewBox="0 0 64 58"
          fill="none"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 text-[#dffbff] drop-shadow-[0_0_18px_rgba(0,235,252,0.85)]"
        >
          <path
            d="M32 53 10.5 31.8C3.6 25 4 14.7 11.4 9.2c6-4.4 14-2.6 18 2.9l2.6 3.5 2.6-3.5c4-5.5 12-7.3 18-2.9 7.4 5.5 7.8 15.8.9 22.6L32 53Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path
            d="M9 31h11l4.5-9 6.5 18 4-9 3.5 0H56"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
