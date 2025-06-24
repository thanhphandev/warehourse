'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { BrandFilter } from '@/components/BrandFilter';
import { Button } from '@/components/ui/button';
import Footer from '@/components/shared/footer';
import { Search } from 'lucide-react';

function HomePageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <>
      {/* Main Content - Show when filters are applied */}
      <div className="container mx-auto py-8">
          {/* Sidebar */}

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

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}
