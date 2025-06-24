'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 pt-16 pb-8">
        
        {/* Section 1: Newsletter Signup & Social Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 border-b border-gray-700 pb-12">
          <div>
            <h3 className="font-bold text-xl text-white mb-3 flex items-center">
              <Mail className="h-6 w-6 mr-2" />
              {t('newsletter.title')}
            </h3>
            <p className="mb-4 text-gray-400">{t('newsletter.description')}</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder={t('newsletter.placeholder')}
                className="bg-gray-800 p-6 border-gray-600 text-white placeholder:text-gray-500 flex-grow"
                aria-label={t('newsletter.placeholder')}
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-6">
                <Send className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('newsletter.button')}</span>
              </Button>
            </form>
          </div>
          <div className="lg:text-right">
            <h3 className="font-bold text-xl text-white mb-4">{t('social.title')}</h3>
            <div className="flex gap-4 lg:justify-end">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={24} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube size={24} /></Link>
            </div>
          </div>
        </div>

        {/* Section 2: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg text-white mb-4">{t('links.about.title')}</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('links.about.aboutUs')}</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">{t('links.about.careers')}</Link></li>
              <li><Link href="/store-locator" className="hover:text-white transition-colors">{t('links.about.storeLocator')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white mb-4">{t('links.support.title')}</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="hover:text-white transition-colors">{t('links.support.helpCenter')}</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">{t('links.support.trackOrder')}</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">{t('links.support.returns')}</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">{t('links.support.shipping')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white mb-4">{t('links.policies.title')}</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="hover:text-white transition-colors">{t('links.policies.privacy')}</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">{t('links.policies.terms')}</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">{t('links.policies.cookies')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg text-white mb-4">{t('links.payments.title')}</h3>
            <div className="flex flex-wrap gap-2">
              <div className="bg-white rounded-md px-2 py-1 flex items-center">
                 <img src="https://static-00.iconduck.com/assets.00/visa-icon-2048x1313-onrjd1ii.png" alt="Visa" className="h-4"/>
              </div>
              <div className="bg-white rounded-md px-2 py-1 flex items-center">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-4"/>
              </div>
              <div className="bg-white rounded-md px-2 py-1 flex items-center">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4"/>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
          <p>{t('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
