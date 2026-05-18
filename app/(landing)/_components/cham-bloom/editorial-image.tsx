import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Editorial frame aligned with hero glass + garden imagery. */
export function EditorialImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div
      className={cn(
        'group relative min-h-[280px] min-w-0 overflow-hidden rounded-3xl',
        'ring-1 ring-white/40 ring-inset shadow-xl shadow-bloom-green-deep/10',
        'md:h-[480px]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={priority}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bloom-green-deep/35 via-transparent to-white/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-3 rounded-2xl border border-white/25"
        aria-hidden
      />
    </div>
  )
}
