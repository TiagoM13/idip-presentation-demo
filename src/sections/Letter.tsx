/**
 * Section 2 — Letter of presentation ("Carta de apresentação")
 * Figma: node 1:10296 ("02. Carta")
 * Flex layout filling the viewport: text card on the left + IDIP symbol on the right.
 */
export function Letter() {
  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-ink">
      {/* Dark background with glow */}
      <img
        src="/assets/background/background-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* IDIP symbol (outline) on the right */}
      <img
        src="/assets/logo/logo.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[5%] top-1/2 z-0 h-[71%] w-auto max-w-[48%] -translate-y-1/2 object-contain drop-shadow-[0_0_10px_rgba(0,235,252,0.35)]"
      />

      {/* Card on the left */}
      <div className="relative z-10 ml-[5.2%] flex h-[81.5%] w-[46%] max-w-217.5 flex-col overflow-hidden rounded-lg border border-brand-blue bg-black/40 p-[clamp(28px,3.3vw,63px)] shadow-glow backdrop-blur-md">
        {/* Inner glows (top-left corner) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-30 -top-35 h-105 w-140 rounded-full bg-[radial-gradient(closest-side,rgba(0,252,206,0.16),transparent)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-15 -top-10 h-75 w-75 rounded-full bg-[radial-gradient(closest-side,rgba(0,133,221,0.18),transparent)] blur-[50px]"
        />

        {/* Label */}
        <p className="relative bg-linear-to-b from-brand-cyan to-brand-blue bg-clip-text text-[clamp(12px,1.04vw,20px)] font-bold uppercase text-transparent">
          Carta de apresentação
        </p>

        {/* Text (vertically centered) */}
        <div className="relative flex flex-1 flex-col justify-center text-fog">
          <p className="mb-[1.25em] text-[clamp(28px,2.5vw,48px)] font-bold leading-normal">
            Prezados,
          </p>
          <div className="flex flex-col gap-[1em] text-[clamp(15px,1.46vw,28px)] font-normal leading-normal">
            <p>Agradecemos o interesse em conhecer a Idip Tecnologia.</p>
            <p>
              Este documento reúne o essencial para você avaliar se nossa entrega
              encaixa no desafio que precisa resolver. Somos uma software house B2B
              sediada em Fortaleza, com atuação nacional e internacional.
            </p>
            <p>
              Não vendemos produto de prateleira. Entregamos engenharia aplicada ao
              negócio do cliente, com processo previsível e time sênior.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
