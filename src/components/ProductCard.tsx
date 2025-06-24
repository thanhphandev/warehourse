'use client';

import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/app/stores/cartStore';
import { useState } from 'react';
import Link from 'next/link';
import { IProduct } from '@/models/product2';
import { IProductVariant } from '@/models/product_variant';

interface ProductCardProps {
  product: IProduct;
  variant?: IProductVariant;
  onViewDetails?: () => void;
}

export function ProductCard({ product, variant, onViewDetails }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!variant) return;
    
    setIsLoading(true);
    try {
      addItem({
        id: `${product._id}-${variant._id}`,
        productId: product._id as string,
        variantId: variant._id as string,
        name: variant.name,
        price: variant.price.sale,
        image: variant.images[0] || '/placeholder.png',
        attributes: variant.attributes,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const discountPercentage = variant 
    ? Math.round((1 - variant.price.sale / variant.price.base) * 100)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={variant?.images[0] || '/placeholder.png'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            -{discountPercentage}%
          </Badge>
        )}

        {product.status === 'draft' && (
          <Badge className="absolute top-2 right-2 bg-gray-500 text-white">
            Draft
          </Badge>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={onViewDetails}
            className="bg-white/90 hover:bg-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {variant && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-red-600">
                ${variant.price.sale.toLocaleString()}
              </span>
              {variant.price.base !== variant.price.sale && (
                <span className="text-sm text-gray-500 line-through">
                  ${variant.price.base.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {variant.attributes.map((attr) => (
                <span
                  key={`${attr.key}-${attr.value}`}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {attr.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!variant || isLoading || variant.status === 'inactive'}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
