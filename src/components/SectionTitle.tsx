import type { ReactNode } from 'react'

export function SectionTitle({
  label,
  title,
  subtitle,
  align = 'left',
  size = 'md',
  className,
}: {
  label: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  size?: 'md' | 'lg'
  className?: string
}) {
  return (
    <div
      className={`flex flex-col gap-[clamp(14px,1.25vw,24px)] ${align === 'center' ? 'items-center text-center' : 'items-start'
        } ${className ?? ''}`}
    >
      <p className="bg-linear-to-b from-brand-cyan to-brand-blue bg-clip-text font-bold uppercase tracking-wide text-transparent text-[clamp(12px,1.05vw,20px)]">
        {label}
      </p>
      <h2
        className={`font-bold leading-[1.12] tracking-[-0.02em] text-fog ${size === 'lg'
            ? 'text-[clamp(34px,4.2vw,80px)]'
            : 'text-[clamp(28px,3.35vw,64px)]'
          }`}
      >
        {title}
      </h2>
      {subtitle != null && (
        <p className="font-normal leading-snug text-fog/90 text-[clamp(15px,1.5vw,28px)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
