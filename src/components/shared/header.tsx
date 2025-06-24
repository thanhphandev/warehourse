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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'; // Assuming you have a Sheet component
import Image from 'next/image';
import { LanguageSwitcher } from './language-switcher';
import { CartSheet } from '../CartSheet';
import { useAuthStore } from '@/app/stores/authStore';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ICategory } from '@/models/category';

interface HeaderProps {
  categories: ICategory[];
}

const Header = ({ categories }: HeaderProps) => {
  const t = useTranslations('HomePage');
  const ta = useTranslations("auth");
  const { user, loading, isAuthenticated, logout } = useAuthStore();

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
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={128}
              height={129}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-white hover:bg-white/10 border border-white/20"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-white/20 text-white text-xs">
                      {isAuthenticated && user ? user.full_name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium">
                      {isAuthenticated && user ? user.full_name : t('accountLabel')}
                    </div>
                    {isAuthenticated && user && (
                      <div className="text-xs text-white/80 truncate max-w-32">
                        {user.email.address}
                      </div>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.full_name}</p>
                      <p className="text-xs text-muted-foreground">{user.email.address}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      disabled={loading}
                      className="text-red-600 focus:text-red-600"
                    >
                      {loading ? ta('logout.loggingOut') : ta("logout.title")}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/login">{ta("buttons.login")}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup">{ta("buttons.signup")}</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <nav className="flex flex-col gap-4">
                    
                    {categories.length > 0 ? (
                      categories
                        .filter((cat: ICategory) => cat.ancestors.length === 0)
                        .map((category: ICategory) => (
                          <Link
                            key={category._id as string}
                            href={`/products?category=${category._id}`}
                            className="block py-2 text-lg font-semibold hover:text-blue-600 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))
                    ) : (
                      <div className="py-2 text-gray-500">
                        <span>You have no categories</span>
                      </div>
                    )}

                    {/* Extra Navigation Items */}
                    <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                      <Link
                        href="/brands"
                        className="text-lg hover:text-blue-600 transition-colors"
                      >
                        Brands
                      </Link>
                      <Link
                        href="/manufacturers"
                        className="text-lg hover:text-blue-600 transition-colors"
                      >
                        Manufacturers
                      </Link>
                      <Link
                        href="/blog"
                        className="text-lg hover:text-blue-600 transition-colors"
                      >
                        Blog
                      </Link>
                    </div>

                    <div className="mt-4 border-t pt-4 flex items-center gap-2">
                      <div className='border border-black rounded-lg p-1'>
                      <LanguageSwitcher />
                      </div>
                      <span>Support Languages</span>
                    </div>
                  </nav>
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

      {/* Navigation Bar (hidden on small screens, visible on md and up) */}
      <div className="hidden md:block border-t border-white/10 bg-blue-800/50">
        <div className="container mx-auto flex justify-center p-4">
          <NavigationMenu>
            <NavigationMenuList>
              {categories.length > 0 ? (
                <>
                  {categoriesWithChildren.map((category) => (
                    <NavigationMenuItem key={category._id as string} className="relative">
                      {category.children.length > 0 ? (
                        <>
                          <NavigationMenuTrigger className="bg-transparent font-bold text-xl text-white hover:bg-white/10 data-[active]:bg-white/10 data-[state=open]:bg-white/10">
                            {category.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-64 p-2">
                              <div className="grid gap-1">
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/products?category=${category._id}`}
                                    className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
                                  >
                                    View All {category.name}
                                  </Link>
                                </NavigationMenuLink>
                                <div className="h-px bg-border my-1" />
                                {category.children.map((child) => (
                                  <NavigationMenuLink key={child._id as string} asChild>
                                    <Link
                                      href={`/products?category=${child._id}`}
                                      className="block px-3 py-2 text-sm hover:bg-accent rounded-md"
                                    >
                                      {child.name}
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/products?category=${category._id}`}
                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          >
                            {category.name}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </>
              ) : (
                <div className="flex items-center py-2 px-4 text-white/60">
                  <span>{"You're have no category"}</span>
                </div>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;