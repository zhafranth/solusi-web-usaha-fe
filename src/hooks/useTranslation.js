import { useLanguageStore } from "../store/languageStore"
import { translations } from "../i18n/translations"

const resolvePath = (obj, path) => {
  const result = path.split(".").reduce((acc, key) => {
    if (acc === undefined || acc === null) return undefined
    return acc[key]
  }, obj)
  return result
}

export const useTranslation = () => {
  const language = useLanguageStore((state) => state.language)
  const dict = translations[language] ?? translations.id

  const t = (path) => {
    const value = resolvePath(dict, path)
    if (value === undefined) {
      const fallback = resolvePath(translations.id, path)
      return fallback ?? path
    }
    return value
  }

  return { t, language }
}
