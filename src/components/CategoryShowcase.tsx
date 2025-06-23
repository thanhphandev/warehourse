'use client';

import { useCategories } from '@/hooks/useApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function CategoryShowcase() {
  const { data: categoriesResponse, isLoading } = useCategories();

  if (isLoading || !categoriesResponse?.data) {
    return null;
  }

  // Get root categories only
  const rootCategories = categoriesResponse.data
    .filter(cat => !cat.parent_id && cat.is_active)
    .slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600">
            Find exactly what you're looking for in our organized categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {rootCategories.map((category) => (
            <Card 
              key={category._id as string}
              className="group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                // Navigate to products filtered by category
                window.location.href = `/?category=${category._id}`;
              }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                  {category.name}
                </h3>
                
                <Badge variant="secondary" className="text-xs">
                  Explore
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
