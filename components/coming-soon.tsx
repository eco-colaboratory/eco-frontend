import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ComingSoon({
  title = 'Coming soon',
  description = 'Tính năng đang được phát triển.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Quay lại sau.</p>
      </CardContent>
    </Card>
  );
}
