import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import BrandCarousel from '@/components/shop/brand-carousel';
import CategoriesSection from '@/components/shop/categories-section';
import FeaturedProducts from '@/components/shop/featured-products';
import HeroSection from '@/components/shop/hero';
import { fetchBrands, fetchCategories, fetchManufacturers, fetchProducts } from '@/hooks/useApi';
import { getLocale } from 'next-intl/server';
import React from 'react'

const HomePage = async () => {
  const locale = await getLocale();
  const brands = await fetchBrands();
  const manufacturers = await fetchManufacturers();
  const categories = await fetchCategories({ lang: locale });
  const products = await fetchProducts({ lang: locale});
  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories.data || []} brands={brands.data || []} manufacturers={manufacturers.data || []} />
      <HeroSection />
      <CategoriesSection  categories={categories.data || []} />
      <FeaturedProducts products={products.data || []} />
      <BrandCarousel brands={brands.data || []} />
      <Footer />
    </div>
  )
}

export default HomePage