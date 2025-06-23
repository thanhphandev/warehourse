'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { BrandFilter } from '@/components/BrandFilter';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { Button } from '@/components/ui/button';
import Footer from '@/components/shared/footer';
import { Search } from 'lucide-react';

function HomePageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      {/* Featured Products - Only show when no filters are applied */}
      <FeaturedProducts />

      {/* Category Showcase - Only show when no filters are applied */}
      <CategoryShowcase />

      {/* Main Content - Show when filters are applied */}
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <CategoryFilter
                  selectedCategory={selectedCategory ?? undefined}
                  onCategoryChange={(categoryId) => setSelectedCategory(categoryId ?? null)}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <BrandFilter
                  selectedBrand={selectedBrand ?? undefined}
                  onBrandChange={(brandId) => setSelectedBrand(brandId ?? null)}
                />
              </div>

              {/* Optional: Search input */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <Button variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ProductGrid
                categoryId={selectedCategory ?? undefined}
                brandId={selectedBrand ?? undefined}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}
