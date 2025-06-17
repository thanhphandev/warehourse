import { getTranslations } from 'next-intl/server';
import React from 'react';
import { User, ShoppingCart, Search } from 'lucide-react';
import { LanguageSwitcher } from './language-switcher';

const Header = async () => {
  const t = await getTranslations('HomePage');

  return (
    <div className="bg-blue-600 text-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="h-10" />
        </div>

        {/* Search Bar */}
        <div className="flex-1 px-6">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full bg-white p-2 rounded-md border border-gray-300 text-black pr-10"
              aria-label={t('searchLabel')}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
          </div>
        </div>

        {/* Profile and Cart */}
        <div className="flex items-center gap-6">
          {/* Account */}
          <div className="flex items-center gap-1 border border-white px-3 py-1 rounded-md cursor-pointer">
            <User size={20} className='mr-2'/>
            <div className='flex flex-col text-lg font-bold items-center'>
              <span>{t("accountLabel")}</span>
            <span className="text-sm underline">
              <a href="/login">{t("linkAuth")}</a>
            </span>
            </div>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-2 border border-white px-3 py-2 rounded-md">
            <ShoppingCart size={20} />
            <span>$0.00</span>
          </div>
          <div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Secondary Navigation (optional) */}
      <div className="bg-blue-800 text-sm py-2">
        <div className="container mx-auto flex gap-6">
          <span className="hover:underline cursor-pointer">Products</span>
          <span className="hover:underline cursor-pointer">Brands</span>
          <span className="hover:underline cursor-pointer">Catalogue</span>
          <span className="hover:underline cursor-pointer">Prescriptions & Vaccinations</span>
          <span className="hover:underline cursor-pointer">Health Services</span>
          <span className="hover:underline cursor-pointer">Find a Store</span>
          <span className="hover:underline cursor-pointer">Blog</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
