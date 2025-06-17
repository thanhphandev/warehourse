import { getTranslations } from 'next-intl/server';
import React from 'react'

const Header = async() => {
  const t = await getTranslations('HomePage');
  return (
    <div className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <img src="/logo.svg" alt="logo" />
        
      </div>
      <div>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="mt-2 p-2 w-full max-w-md rounded border border-gray-300"
          aria-label={t('searchLabel')}
          />
          <button>{t("searchLabel")}</button>
      </div>
      
    </div>
  )
}

export default Header