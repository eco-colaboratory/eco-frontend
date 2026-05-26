import { cn } from '@/lib/utils';

type MainProps = React.ComponentProps<'main'> & {
  fixed?: boolean;
  fluid?: boolean;
};

export function Main({ className, fixed, fluid, ...props }: MainProps) {
  return (
    <main
      id="content"
      className={cn(
        'flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6',
        !fluid && 'w-full',
        fixed && 'min-h-0 overflow-auto',
        className
      )}
      {...props}
    />
  );
}
