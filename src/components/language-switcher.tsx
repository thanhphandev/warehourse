"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="bg-blue-600 text-white border border-white rounded px-3 py-1 hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white"
    >
      <option value="en" className="text-black">EN</option>
      <option value="vi" className="text-black">VI</option>
      <option value="zh" className="text-black">ZH</option>
    </select>

  );
};
