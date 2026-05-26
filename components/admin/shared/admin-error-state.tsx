import { Button } from '@/components/ui/button';

export function AdminErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-center"
      role="alert"
    >
      <p className="text-sm font-medium text-red-800">{message}</p>
      {onRetry ? (
        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          Thử lại
        </Button>
      ) : null}
    </div>
  );
}
