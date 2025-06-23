'use client';

import { useProductBySlug, useProductVariants } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/app/stores/cartStore';
import { ShoppingCart, Heart, Share2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { IProductVariant,} from '@/models/product_variant';

interface ProductDetailProps {
  productSlug: string;
}

export function ProductDetail({ productSlug }: ProductDetailProps) {
  const { data: productResponse, isLoading: productLoading } = useProductBySlug(productSlug);
  const productData = productResponse?.data;
  const { data: variantsResponse, isLoading: variantsLoading } = useProductVariants(productData && typeof productData._id === 'string' ? productData._id : '');
  const { addItem } = useCartStore();
  
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (productLoading || variantsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading product...</span>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const variants = variantsResponse?.data || [];
  const defaultVariant = variants.find(v => v.is_default) || variants[0];
  const currentVariant = selectedVariant || defaultVariant;

  const handleAddToCart = async () => {
    if (!currentVariant) return;
    
    setIsAddingToCart(true);
    try {
      addItem({
        id: `${productData._id}-${currentVariant._id}`,
        productId: productData._id as string,
        variantId: currentVariant._id as string,
        name: currentVariant.name,
        price: currentVariant.price.sale,
        image: currentVariant.images[selectedImage] || currentVariant.images[0] || '/placeholder.png',
        attributes: currentVariant.attributes,
        quantity,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const discountPercentage = currentVariant 
    ? Math.round((1 - currentVariant.price.sale / currentVariant.price.base) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img
            src={currentVariant?.images[selectedImage] || currentVariant?.images[0] || '/placeholder.png'}
            alt={productData.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {currentVariant?.images && currentVariant.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {currentVariant.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded border-2 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${productData.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>          <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
          {productData.description && (
            <p className="text-gray-600">{productData.description}</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {productData.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price */}
        {currentVariant && (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-red-600">
                ${currentVariant.price.sale.toLocaleString()}
              </span>
              {currentVariant.price.base !== currentVariant.price.sale && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${currentVariant.price.base.toLocaleString()}
                  </span>
                  <Badge className="bg-red-500 text-white">
                    -{discountPercentage}%
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600">SKU: {currentVariant.sku}</p>
          </div>
        )}

        {/* Variants */}
        {variants.length > 1 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Available Options:</h3>
            <div className="grid grid-cols-2 gap-2">
              {variants.map((variant) => (
                <Card
                  key={variant._id as string}
                  className={`cursor-pointer transition-colors ${
                    selectedVariant?._id === variant._id || (!selectedVariant && variant.is_default)
                      ? 'ring-2 ring-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={variant.images[0] || '/placeholder.png'}
                        alt={variant.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-2">{variant.name}</p>
                        <p className="text-sm text-red-600 font-bold">
                          ${variant.price.sale.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Attributes */}
        {currentVariant?.attributes && currentVariant.attributes.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Specifications:</h3>
            <div className="grid grid-cols-2 gap-2">
                {currentVariant.attributes.map((attr) => (
                <div key={`${attr.key}-${attr.value}`} className="flex justify-between">
                  <span className="text-gray-600 capitalize">{attr.key}:</span>
                  <span className="font-medium">{attr.value}</span>
                </div>
                ))}
            </div>
          </div>
        )}

        {/* Quantity & Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!currentVariant || isAddingToCart || currentVariant.status === 'inactive'}
              className="flex-1"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </Button>
            
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge 
              variant={currentVariant?.status === 'active' ? 'default' : 'secondary'}
            >
              {currentVariant?.status || 'Unknown'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
