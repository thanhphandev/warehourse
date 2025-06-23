'use client';

import { useProducts, useProductVariants } from '@/hooks/useApi';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ui/skeleton';
import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  categoryId?: string;
  brandId?: string;
  searchQuery?: string;
}

export function ProductGrid({ categoryId, brandId, searchQuery }: ProductGridProps) {
  const [page, setPage] = useState(1);
  const limit = 12;

  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts({
    category_id: categoryId,
    brand_id: brandId,
    search: searchQuery,
    page,
    limit,
    status: 'published', // Only show published products
  });
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Search className="h-8 w-8 text-gray-400 mb-4" />
        <p className="text-gray-600">Failed to load products. Please try again.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  const products = productsResponse?.data || [];
  const pagination = productsResponse?.pagination;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Search className="h-8 w-8 text-gray-400 mb-4" />
        <p className="text-gray-600">No products found.</p>
        {(categoryId || brandId || searchQuery) && (
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your filters or search terms.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {products.length} of {pagination?.total || products.length} products
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        
        {pagination && pagination.total > limit && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="px-3 py-1 text-sm">
              Page {page} of {Math.ceil(pagination.total / limit)}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= Math.ceil(pagination.total / limit)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductWithVariant key={product._id as string} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.total > limit && (
        <div className="flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={page >= Math.ceil(pagination.total / limit)}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Component to fetch and display product with its default variant
function ProductWithVariant({ product }: { product: any }) {
  const { data: variantsResponse } = useProductVariants(product._id);
  
  const variants = variantsResponse?.data || [];
  const defaultVariant = variants.find(v => v.is_default) || variants[0];

  return (
    <ProductCard
      product={product}
      variant={defaultVariant}
      onViewDetails={() => {
        // Navigate to product detail page
        window.location.href = `/products/${product.slug}`;
      }}
    />
  );
}
