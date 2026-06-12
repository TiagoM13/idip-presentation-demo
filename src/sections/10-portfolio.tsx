import { SectionTitle } from '../components/SectionTitle'

/**
 * Section 10 — Portfólio
 * Figma: node 1:10322 (variant "10-…")
 * Heading on the left, 2×2 grid of case studies (with cross dividers) on the right.
 */

const CASES: { name: string; rest: string; desc: string; result: string }[] = [
  {
    name: 'Espaço Júnior',
    rest: ' - Healthtech | pediatria',
    desc: 'Plataforma integra prontuário, agenda e comunicação com famílias para Centro especializado em TEA com 11 unidades no Sul',
    result: 'Acompanhou expansão de 3 para 11 unidades',
  },
  {
    name: 'Odontoped',
    rest: ' - Healthtech | SaaS',
    desc: 'SaaS para odontopediatria com agenda inteligente, notificações via WhatsApp Business API e prontuário com templates',
    result: 'Redução de no-show via confirmação automática',
  },
  {
    name: 'Raras Nation',
    rest: ' - Healthtech | terceiro setor',
    desc: 'Plataforma para pacientes com doenças raras: comunidade, dados de saúde e LGPD para dados sensíveis',
    result: 'Tecnologia acessível para público historicamente desassistido',
  },
  {
    name: 'GAM CD',
    rest: ' - Logística & Suprimentos',
    desc: 'Centros de Distribuição WMS sob medida para operações de grande porte: romaneio, picking, expedição e rastreabilidade ponta a ponta',
    result: 'Operação logística estável em escala crítica',
  },
]

export function Portfolio() {
  return (
    <section className="relative flex h-screen w-full items-start overflow-hidden px-[clamp(40px,5.2vw,100px)] py-[clamp(48px,9vh,110px)]">
      {/* Glow (left corner, below the title) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[6%] left-[-5%] aspect-square w-[clamp(240px,24vw,440px)] rounded-full bg-[radial-gradient(closest-side,rgba(0,120,180,0.24),transparent)]"
      />

      <div className="relative z-10 flex w-full items-start gap-[clamp(32px,5vw,100px)]">
        {/* Heading */}
        <div className="w-[clamp(240px,27vw,440px)] shrink-0">
          <SectionTitle label="Portfólio de cases" title="Outros projetos em destaque" />
        </div>

        {/* Cases grid 2×2 with cross dividers */}
        <div className="grid flex-1 grid-cols-2">
          {CASES.map((c, i) => (
            <div
              key={c.name}
              className={`flex flex-col gap-[clamp(8px,1vw,18px)] ${
                i % 2 === 0
                  ? 'pr-[clamp(20px,2.4vw,46px)]'
                  : 'pl-[clamp(20px,2.4vw,46px)]'
              } ${i < 2 ? 'pb-[clamp(20px,2.4vw,44px)]' : 'pt-[clamp(20px,2.4vw,44px)]'} ${
                i % 2 === 0 ? 'border-r border-fog/15' : ''
              } ${i < 2 ? 'border-b border-fog/15' : ''}`}
            >
              <p className="font-bold uppercase leading-tight text-fog text-[clamp(11px,1.02vw,20px)]">
                <span className="bg-linear-to-b from-brand-cyan to-brand-blue bg-clip-text text-transparent">
                  {c.name}
                </span>
                {c.rest}
              </p>
              <p className="leading-snug text-fog text-[clamp(12px,1.15vw,22px)]">
                {c.desc}
              </p>
              <div className="mt-[clamp(4px,0.5vw,10px)] flex flex-col gap-[clamp(2px,0.4vw,8px)] rounded-lg bg-[#d9d9d9]/10 p-[clamp(12px,1.2vw,22px)]">
                <p className="font-bold uppercase text-fog text-[clamp(10px,0.85vw,16px)]">
                  Resultado
                </p>
                <p className="leading-snug text-fog text-[clamp(12px,1.1vw,20px)]">
                  {c.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
