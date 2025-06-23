import { Card, CardContent, CardFooter } from '@/components/ui/card';

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      
      <CardContent className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
        
        <div className="flex gap-1 mb-3">
          <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-24" />
          <div className="flex gap-1">
            <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
