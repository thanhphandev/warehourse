'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/shared/header';
import { ProductDetail } from '@/components/ProductDetail';
import { QueryProvider } from '@/components/QueryProvider';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ProductDetailPageContent() {
  const params = useParams();
  const productSlug = params.slug as string;

  return (
    <div className="min-h-screen bg-gray-50">      
      <div className="container mx-auto py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ProductDetail productSlug={productSlug} />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <QueryProvider>
      <ProductDetailPageContent />
    </QueryProvider>
  );
}
