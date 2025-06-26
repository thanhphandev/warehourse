'use client';

import React from 'react';
import { User, Search, ChevronDown, Menu, Languages } from 'lucide-react'; // Added Menu icon
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { LanguageSwitcher } from './language-switcher';
import { CartSheet } from '../CartSheet';
import { useAuthStore } from '@/app/stores/authStore';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ICategory } from '@/models/category';
import { IBrand } from '@/models/brand';
import { IManufacturer } from '@/models/manufacturer';
import UserAvatar from './user-avatar';

interface HeaderProps {
  categories: ICategory[];
  brands: IBrand[];
  manufacturers: IManufacturer[];
}

const Header = ({ categories, brands, manufacturers }: HeaderProps) => {
  const t = useTranslations('HomePage');
  // Process categories
  const parentCategories = categories.filter((cat: ICategory) => cat.ancestors.length == 0) || [];
  const childCategories = categories.filter((cat: ICategory) => cat.ancestors.length > 0) || [];

  const categoriesWithChildren = parentCategories.map((parent: ICategory) => {
    const children = childCategories.filter((child: ICategory) =>
      child.parent_id?.toString() === (parent._id as string).toString()
    );
    return { ...parent, children };
  });

  return (
    <header className="top-0 z-50 w-full border-b bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 backdrop-blur supports-[backdrop-filter]:bg-blue-600/95">
      {/* Main Header */}
      <div className="container mx-auto p-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center bg-white rounded-lg">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
          </Link>

          {/* Search Bar (hidden on small screens, visible on md and up) */}
          <div className="flex-1 hidden md:block py-8 sm:mx-8 max-w-4xl">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-16 pr-6 py-5 text-xl rounded-lg bg-white/95 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-label={t('searchLabel')}
              />
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-between gap-4 items-center">

            {/* Cart */}
            <CartSheet />
            {/* User Account */}
            <UserAvatar />

            <div className='hidden md:block'>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button (visible on small screens) */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-4">
                  {/* Accessible hidden title for screen readers */}
                  <VisuallyHidden>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </VisuallyHidden>
                  {/* Navigation Links */}
                  <div className="h-full overflow-y-scroll no-scrollbar mt-10">
                    <Accordion type="multiple" className="w-full">

                      {/* Categories */}
                      <AccordionItem value="categories">
                        <AccordionTrigger className="text-lg">{t("categories")}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          {categoriesWithChildren.length > 0 ? (
                            categoriesWithChildren.map((cat) => (
                              <Link
                                key={cat._id as string}
                                href={`/products?category=${cat._id}`}
                                className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                              >
                                {cat.name}
                              </Link>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500">No categories available</div>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Brands */}
                      <AccordionItem value="brands">
                        <AccordionTrigger className="text-lg">{t("brands")}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          {brands.map((brand) => (
                            <Link
                              key={brand._id as string}
                              href={`/brands/${brand.slug}`}
                              className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                            >
                              {brand.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>

                      {/* Manufacturers */}
                      <AccordionItem value="manufacturers">
                        <AccordionTrigger className="text-lg">{t("manufacturers")}</AccordionTrigger>
                        <AccordionContent className="pl-4">
                          {manufacturers.map((mfr) => (
                            <Link
                              key={mfr.slug}
                              href={`/manufacturers/${mfr.slug}`}
                              className="block py-1 text-sm text-gray-700 hover:text-blue-600"
                            >
                              {mfr.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Blog (không cần Accordion) */}
                    <Link
                      href="/blog"
                      className="mt-6 block text-lg font-semibold hover:text-blue-600 transition-colors"
                    >
                      Blog
                    </Link>

                    {/* Language Switcher */}
                    <div className="mt-6 border-t pt-4 flex items-center gap-2">
                      <div className="border border-black rounded-lg p-1">
                        <LanguageSwitcher />
                      </div>
                      <span className="text-sm">Support Languages</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="block md:hidden mt-8">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full pl-16 pr-6 py-5 text-xl rounded-lg bg-white/95 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={t('searchLabel')}
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block border-t border-white/10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-8 items-center justify-start">

            {/* Categories */}
            <div className="relative group">
              <button className="text-base font-semibold text-gray-800 hover:text-blue-600 px-4 py-2 flex items-center gap-1">
                {t("categories")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  {categoriesWithChildren.map((cat) => (
                    <li key={cat._id as string}>
                      <Link
                        href={`/products?category=${cat._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Brands */}
            <div className="relative group">
              <button className="text-base font-semibold text-gray-800 hover:text-blue-600 px-4 py-2 flex items-center gap-1">
                {t("brands")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  {brands.map((brand) => (
                    <li key={brand._id as string}>
                      <Link
                        href={`/brands/${brand.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {brand.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Manufacturers */}
            <div className="relative group">
              <button className="text-base font-semibold text-gray-800 hover:text-blue-600 px-4 py-2 flex items-center gap-1">
                {t("manufacturers")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  {manufacturers.map((mfr) => (
                    <li key={mfr.slug}>
                      <Link
                        href={`/manufacturers/${mfr.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        {mfr.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Blog */}
            <div>
              <Link
                href="/blog"
                className="text-base font-semibold text-gray-800 hover:text-blue-600 px-4 py-2"
              >
                Blog
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;