import { useEffect, useState } from 'react'

/**
 * Section 1 — Cover / Opening
 * Figma: node 1:20272 (Apresentação Institucional)
 * On load the centered IDIP logo glides from the middle to the top-left corner;
 * the title + subtitle fade in as it arrives. (No "press arrows to navigate" hint.)
 */
export function Cover() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // Let the initial (centered) frame paint, then trigger the transition.
    const id = setTimeout(() => setEntered(true), 120)
    return () => clearTimeout(id)
  }, [])

  return (
    <section
      id="cover"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Subtle top-center grid, fading at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[7%] h-[36%] w-[40%] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(125,150,180,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,150,180,0.13)_1px,transparent_1px)] bg-size-[38px_38px] mask-[radial-gradient(ellipse_at_center,#000_28%,transparent_72%)]"
      />

      {/* Raised dark floor (Figma el01) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-26%] left-1/2 h-[40%] w-[64%] -translate-x-1/2 rounded-[50%] bg-ink shadow-[0_0_110px_40px_rgba(0,150,200,0.15)]"
      />

      {/* Company info (top-right) */}
      <div
        className={`absolute right-[clamp(24px,5vw,100px)] top-[clamp(20px,3.4vh,48px)] z-20 text-right font-light leading-[1.437] text-fog/85 text-[clamp(10px,1.05vw,20px)] transition-all duration-700 ease-out ${
          entered ? 'translate-y-0 opacity-100 delay-500' : '-translate-y-2 opacity-0'
        }`}
      >
        <p>CNPJ 33.934.121/0001-60</p>
        <p>©2026 Idip Tecnologia</p>
      </div>

      {/* Title + subtitle (centre) — rise up + fade in as the logo settles */}
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[min(90%,940px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        {/* Text rises up from the bottom of the screen */}
        <div
          className={`flex flex-col items-center gap-[clamp(12px,1.6vw,24px)] text-center transition-all duration-1000 ease-out ${
            entered ? 'translate-y-0 opacity-100 delay-600' : 'translate-y-[60vh] opacity-0'
          }`}
        >
          <h1 className="font-ubuntu font-bold leading-[1.05] text-fog text-[clamp(48px,6.7vw,128px)]">
            Apresentação
            <br />
            Institucional
          </h1>
          <p className="font-normal leading-[1.3] text-fog/90 text-[clamp(14px,1.46vw,28px)]">
            Desenvolvimento de software sob demanda
            <br />
            para empresas com operação relevante
          </p>
        </div>
        {/* Divider — stays put, only fades in once the text is centred */}
        <span
          aria-hidden="true"
          className={`mt-[clamp(20px,2.5vw,40px)] h-px w-[clamp(160px,14vw,200px)] bg-linear-to-r from-brand-cyan to-[#3d4656] transition-opacity duration-700 ${
            entered ? 'opacity-100 delay-1400' : 'opacity-0'
          }`}
        />
      </div>

      {/* IDIP logo — starts centered & large, glides to the top-left corner */}
      <img
        src="/assets/logo/logo-idip.png"
        alt="IDIP Tecnologia"
        className={`absolute z-30 transition-all duration-1100 ease-in-out ${
          entered
            ? 'left-[clamp(24px,5vw,100px)] top-[clamp(20px,3.4vh,48px)] w-[clamp(90px,9vw,160px)] translate-x-0 translate-y-0'
            : 'left-1/2 top-1/2 w-[clamp(280px,33vw,640px)] -translate-x-1/2 -translate-y-1/2'
        }`}
      />
    </section>
  )
}
