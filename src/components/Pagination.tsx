/**
 * Slide pagination bullets, shared across sections (08, 12, …).
 * Active bullet uses the brand gradient with a soft blur halo and a #21BA7D
 * (brand-green) drop shadow; inactive bullets are small and muted.
 */

function Bullet({ active }: { active: boolean }) {
  return (
    <span className="relative flex size-[clamp(10px,0.85vw,16px)] shrink-0 items-center justify-center">
      {/* Blur halo — fades/scales in when active (with a slow breathing pulse) */}
      <span
        aria-hidden="true"
        className={`absolute inset-[-70%] rounded-full bg-brand-gradient blur-md transition-all duration-500 ease-out ${
          active ? 'scale-100 opacity-50 motion-safe:animate-pulse' : 'scale-50 opacity-0'
        }`}
      />
      {/* Active dot — brand gradient, grows in with a green glow */}
      <span
        className={`absolute rounded-full bg-brand-gradient transition-all duration-500 ease-out ${
          active
            ? 'size-full opacity-100 drop-shadow-[0_0_8px_var(--color-brand-green)]'
            : 'size-[55%] opacity-0'
        }`}
      />
      {/* Inactive dot — muted, fades out as it becomes active */}
      <span
        className={`absolute size-[55%] rounded-full bg-fog/30 transition-opacity duration-500 ease-out ${
          active ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </span>
  )
}

export function Pagination({
  count,
  active,
  orientation = 'horizontal',
  className,
}: {
  count: number
  active: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center ${
        orientation === 'vertical'
          ? 'flex-col gap-[clamp(16px,2vw,40px)]'
          : 'gap-[clamp(8px,0.9vw,16px)]'
      } ${className ?? ''}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Bullet key={i} active={i === active} />
      ))}
    </div>
  )
}
