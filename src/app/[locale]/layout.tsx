import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import AppProvider from './app-provider';
import { fetchBrands, fetchCategories, fetchManufacturers } from '@/hooks/useApi';
import Header from '@/components/shared/header';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const categories = await fetchCategories();
  const brands = await fetchBrands();
  const manufacturers = await fetchManufacturers();

  return (
    <NextIntlClientProvider locale={locale}>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header categories={categories.data || []} brands={brands.data || []} manufacturers={ manufacturers.data || []} />
          {children}
        </div>
      </AppProvider>
    </NextIntlClientProvider>
  );
}