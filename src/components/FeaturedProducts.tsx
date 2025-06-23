'use client';

import { useProducts } from '@/hooks/useApi';
import { ProductCard } from './ProductCard';
import { useProductVariants } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FeaturedProducts() {
  const { data: productsResponse, isLoading } = useProducts({
    status: 'published',
    limit: 4,
  });

  if (isLoading || !productsResponse?.data) {
    return null;
  }

  const products = productsResponse.data;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products, carefully selected for quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductWithVariant key={product._id as string} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/">
            <Button size="lg">
              View All Products
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
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
        window.location.href = `/products/${product.slug}`;
      }}
    />
  );
}
