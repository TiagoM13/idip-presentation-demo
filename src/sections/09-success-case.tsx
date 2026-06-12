/**
 * Section 09 — Case de sucesso
 * Figma: node 1:10319 (variant "09-…")
 * Heading top-left, glow on the right, 3 columns (Desafio / Solução / Resultado) at the bottom.
 */

const COLUMNS: { h: string; t: string }[] = [
  {
    h: 'Desafio',
    t: 'Cadastro de novos representantes passava por 3 setores e levava em média 20 dias. O gargalo travava a expansão comercial',
  },
  {
    h: 'Solução',
    t: 'Redesenhamos o fluxo completo: 3 etapas viraram 1 módulo digital com validações automáticas e rastreabilidade de ponta a ponta',
  },
  {
    h: 'Resultado',
    t: 'Redução de 99% no tempo de cadastro para 30 minutos. Eliminação total de perdas de pedidos por flutuação de acesso',
  },
]

export function SuccessCase() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-ink px-[clamp(40px,5.2vw,100px)] py-[clamp(48px,9vh,110px)]">
      {/* Glow (right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[6%] top-[34%] aspect-square w-[clamp(280px,30vw,560px)] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,130,190,0.3),rgba(0,80,150,0.08),transparent)]"
      />

      {/* Bottom perspective grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] [perspective:600px]"
      >
        <div className="absolute inset-x-[-20%] bottom-0 top-0 origin-bottom [transform:rotateX(68deg)] [background-image:linear-gradient(to_right,rgba(120,160,190,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,190,0.1)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_top,#000,transparent)]" />
      </div>

      {/* Heading */}
      <div className="relative z-10">
        <p className="bg-gradient-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
          Case em destaque
        </p>
        <h2 className="mt-[clamp(12px,1.4vw,24px)] font-bold leading-tight text-fog text-[clamp(34px,4.2vw,80px)]">
          GAM
          <br />
          Distribuidora
        </h2>
      </div>

      {/* Columns (with vertical dividers between them) */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-370 items-stretch">
        {COLUMNS.map((c, i) => (
          <div key={c.h} className="flex flex-1 items-stretch">
            {i > 0 && (
              <div
                aria-hidden="true"
                className="mx-[clamp(20px,2.6vw,50px)] w-px shrink-0 self-stretch bg-linear-to-b from-transparent via-fog/25 to-transparent"
              />
            )}
            <div className="flex flex-1 flex-col gap-[clamp(12px,1.4vw,24px)]">
              <p className="font-bold uppercase tracking-wide text-fog text-[clamp(12px,1.05vw,20px)]">
                {c.h}
              </p>
              <p className="leading-snug text-fog text-[clamp(14px,1.45vw,28px)]">
                {c.t}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
