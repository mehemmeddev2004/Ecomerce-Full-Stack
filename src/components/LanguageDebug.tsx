"use client"

import { useTranslation } from "@/contexts/LocaleContext"

export default function LanguageDebug() {
  const { locale, setLocale, t } = useTranslation()

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50">
      <div className="text-sm mb-2">
        <strong>Current Locale:</strong> {locale}
      </div>
      
      <div className="text-sm mb-2">
        <strong>Test Translation:</strong> {t('welcome.greeting')}
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => setLocale('az')}
          className={`px-3 py-1 rounded ${locale === 'az' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          AZ
        </button>
        <button 
          onClick={() => setLocale('en')}
          className={`px-3 py-1 rounded ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLocale('ru')}
          className={`px-3 py-1 rounded ${locale === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          RU
        </button>
      </div>
      
      <div className="text-xs mt-2 text-gray-500">
        localStorage: {typeof window !== 'undefined' ? localStorage.getItem('locale') : 'N/A'}
      </div>
    </div>
  )
}
