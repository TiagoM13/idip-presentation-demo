/**
 * Section 14 — Contact ("Contato") — last slide
 * Figma: node 1:10333 (variant "14-02")
 * Heading + subtitle centered, 4 contact cards at the bottom, ambient glow background.
 */

type ContactCard = {
  label: string
  value: string
  href: string
  icon: string
  underline?: boolean
}

const CONTACTS: ContactCard[] = [
  {
    label: 'Site',
    value: 'idip.com.br',
    href: 'https://www.idip.com.br/',
    icon: '/assets/icons/cursor.png',
    underline: true,
  },
  {
    label: 'E-mail',
    value: 'comercial@idip.com.br',
    href: 'mailto:comercial@idip.com.br',
    icon: '/assets/icons/envelope-simple.png',
    underline: true,
  },
  {
    label: 'LinkedIn',
    value: '/company/idip-tecnologia',
    href: 'https://www.linkedin.com/company/idip-tecnologia',
    icon: '/assets/icons/linkedin-logo.png',
  },
  {
    label: 'Instagram',
    value: '@idiptecnologia',
    href: 'https://www.instagram.com/idiptecnologia',
    icon: '/assets/icons/instagram-logo.png',
  },
]

// Corner glow per card — each card lights a different corner (Figma Blur-Grande).
const CARD_GLOWS = [
  'bg-[radial-gradient(78%_125%_at_0%_0%,rgba(0,210,180,0.38),transparent_70%)]', // top-left
  'bg-[radial-gradient(78%_125%_at_100%_0%,rgba(0,210,180,0.38),transparent_70%)]', // top-right
  'bg-[radial-gradient(78%_125%_at_0%_100%,rgba(0,210,180,0.38),transparent_70%)]', // bottom-left
  'bg-[radial-gradient(78%_125%_at_100%_100%,rgba(0,210,180,0.38),transparent_70%)]', // bottom-right
]

export function Contact() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Color glows: blue central band + teal edges (Figma) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_42%_at_55%_48%,rgba(22,98,205,0.38),transparent_72%),radial-gradient(42%_34%_at_73%_50%,rgba(12,84,185,0.24),transparent_70%),radial-gradient(28%_28%_at_0%_50%,rgba(0,195,152,0.36),transparent_70%),radial-gradient(27%_28%_at_100%_50%,rgba(0,185,162,0.34),transparent_70%),radial-gradient(42%_30%_at_50%_42%,rgba(120,150,220,0.14),transparent_70%)]"
      />
      {/* Motion texture overlay (Figma Textura-Motion) */}
      <img
        src="/assets/background/texture-motion.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-soft-light"
      />
      {/* Vignette top/bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,transparent_22%,transparent_70%,rgba(0,0,0,0.66)_100%)]"
      />

      {/* Top bar: logo + company info */}
      <header className="relative z-10 flex items-start justify-between px-[clamp(24px,5vw,100px)] pt-[clamp(20px,3.4vh,48px)]">
        <img
          src="/assets/logo/logo-idip-menor.png"
          alt="IDIP Tecnologia"
          className="h-[clamp(36px,4.2vw,80px)] w-auto"
        />
        <div className="text-right font-light leading-[1.437] text-fog/85 text-[clamp(10px,1.05vw,20px)]">
          <p>CNPJ 33.934.121/0001-60</p>
          <p>©2026 Idip Tecnologia</p>
        </div>
      </header>

      {/* Center: heading + subtitle */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-[5%] text-center">
        <a
          href="https://wa.me/5532988915909"
          target="_blank"
          rel="noreferrer"
          className="group"
        >
          <h2 className="font-ubuntu font-bold leading-none text-fog text-[clamp(44px,6.5vw,110px)] transition-colors text-shadow-[0_0_40px_rgba(0,150,200,0.25)] group-hover:text-brand-cyan">
            Vamos conversar!
          </h2>
        </a>
        <p className="mt-[clamp(12px,1.7vw,28px)] max-w-[62ch] font-light leading-[1.437] text-fog/60 text-[clamp(14px,1.55vw,28px)]">
          Agende um diagnóstico gratuito. Entendemos sua operação
          <br />e mostramos onde a tecnologia faz diferença real.
        </p>
      </div>

      {/* Contact cards */}
      <div className="relative z-10 grid grid-cols-2 gap-[clamp(12px,1.5vw,24px)] px-[clamp(24px,5vw,100px)] pb-[clamp(24px,4vh,60px)] md:grid-cols-4">
        {CONTACTS.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center gap-[clamp(10px,1vw,20px)] overflow-hidden rounded-lg border border-brand-blue bg-black/40 p-[clamp(14px,1.2vw,23px)] backdrop-blur-md transition-colors hover:border-brand-cyan"
          >
            {/* Corner glow (different corner per card) */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 ${CARD_GLOWS[i]}`}
            />
            <span className="relative z-10 flex aspect-square w-[clamp(48px,5vw,98px)] shrink-0 items-center justify-center rounded-xl">
              <img src={c.icon} alt="" aria-hidden="true" className="w-[71%]" />
            </span>
            <span className="relative z-10 flex min-w-0 flex-col">
              <span className="font-bold leading-[1.437] text-fog text-[clamp(16px,1.5vw,16px)]">
                {c.label}
              </span>
              <span
                className={`leading-[1.437] tracking-[-0.01em] text-fog/90 text-[clamp(13px,1.2vw,14px)] ${c.underline ? 'underline decoration-from-font' : ''
                  }`}
              >
                {c.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
