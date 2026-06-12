/**
 * Section 1 — Cover / Opening
 * Figma: node 1:10295 (Apresentação Institucional)
 * Dark background with glow + subtle top-center grid + centered IDIP logo.
 */
export function Cover() {
  return (
    <section
      id="cover"
      className="relative h-screen w-full overflow-hidden bg-ink-soft"
    >
      {/* Background: dark gradient with blue glow (Figma background) */}
      <img
        src="/assets/background/background-1.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Subtle top-center grid, fading at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[7%] h-[36%] w-[40%] -translate-x-1/2 bg-[linear-gradient(to_right,rgba(125,150,180,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(125,150,180,0.13)_1px,transparent_1px)] bg-size-[38px_38px] mask-[radial-gradient(ellipse_at_center,#000_28%,transparent_72%)]"
      />

      {/* Centered IDIP logo */}
      <img
        src="/assets/logo/logo-idip.png"
        alt="IDIP Tecnologia"
        className="absolute left-1/2 top-1/2 w-[clamp(280px,33vw,640px)] -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  )
}
