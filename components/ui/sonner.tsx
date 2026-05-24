'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ theme = 'light', ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-bloom-green-mid/20 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-600',
          actionButton: 'group-[.toast]:bg-bloom-green-mid group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700',
          closeButton: 'group-[.toast]:bg-white group-[.toast]:text-gray-600 group-[.toast]:border-gray-200',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
