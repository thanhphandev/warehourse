'use client';

import { useBrands } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface BrandFilterProps {
  selectedBrand?: string;
  onBrandChange: (brandId: string | undefined) => void;
}

export function BrandFilter({ selectedBrand, onBrandChange }: BrandFilterProps) {
  const { data: brandsResponse, isLoading } = useBrands();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="ml-2">Loading brands...</span>
      </div>
    );
  }

  if (!brandsResponse?.data) {
    return null;
  }

  const brands = brandsResponse.data;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Brands</h3>
        {selectedBrand && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBrandChange(undefined)}
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <Button
          variant={!selectedBrand ? "default" : "ghost"}
          size="sm"
          className="w-full justify-start"
          onClick={() => onBrandChange(undefined)}
        >
          All Brands
        </Button>

        {brands.map((brand) => (
          <Button
            key={brand._id as string}
            variant={selectedBrand === brand._id ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
            onClick={() => onBrandChange(selectedBrand === (brand._id as string) ? undefined : (brand._id as string))}
          >
            <div className="flex items-center gap-2">
              {brand.logo && (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-4 h-4 object-contain"
                />
              )}
              {brand.name}
            </div>
          </Button>
        ))}
      </div>

      {selectedBrand && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected:</h4>
          <Badge variant="secondary" className="mr-2">
            {brands.find(brand => brand._id === selectedBrand)?.name}
          </Badge>
        </div>
      )}
    </div>
  );
}
