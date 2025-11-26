"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Locale = "az" | "en" | "ru"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const translations: Record<Locale, any> = {
  az: null,
  en: null,
  ru: null,
}

const loadTranslations = async (locale: Locale, forceReload = false) => {
  if (!forceReload && translations[locale] && Object.keys(translations[locale]).length > 0) {
    return translations[locale]
  }

  try {
    let localeModule
    
    if (locale === "az") {
      localeModule = await import("../locales/az.json")
    } else if (locale === "en") {
      localeModule = await import("../locales/en.json")
    } else if (locale === "ru") {
      localeModule = await import("../locales/ru.json")
    }
    
    const data = localeModule?.default || localeModule || {}
    translations[locale] = data
    return data
  } catch (error) {
    if (locale !== "az") {
      try {
        const fallback = await import("../locales/az.json")
        return fallback.default || fallback
      } catch {
        return {}
      }
    }
    return {}
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("az")
  const [translationsData, setTranslationsData] = useState<any>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    
    const initialLocale: Locale = (savedLocale && ["az", "en", "ru"].includes(savedLocale)) 
      ? savedLocale 
      : "az"
    
    setLocaleState(initialLocale)
    loadTranslations(initialLocale).then((data) => {
      setTranslationsData(data)
      setIsLoaded(true)
    })
  }, [])

  useEffect(() => {
    if (locale && isLoaded) {
      loadTranslations(locale).then((data) => {
        setTranslationsData(data)
      })
    }
  }, [locale, isLoaded])

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return
    
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    
    setTranslationsData({})
    
    loadTranslations(newLocale, true).then((data) => {
      setTranslationsData(data)
    }).catch(() => {
      loadTranslations("az", true).then((fallbackData) => {
        setTranslationsData(fallbackData)
      })
    })
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!translationsData || Object.keys(translationsData).length === 0) {
      return key
    }

    const keys = key.split(".")
    let value: any = translationsData

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        return key
      }
    }

    let result = String(value)

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{${paramKey}}`, String(paramValue))
      })
    }

    return result
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LocaleProvider")
  }
  return context
}

