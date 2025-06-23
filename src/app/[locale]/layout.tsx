import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import AppProvider from './app-provider';
import { fetchCategories } from '@/hooks/useApi';
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

  return (
    <NextIntlClientProvider locale={locale}>
      <AppProvider>
        <div className="min-h-screen bg-gray-50">
          <Header categories={categories.data} />
          {children}
        </div>
      </AppProvider>
    </NextIntlClientProvider>
  );
}