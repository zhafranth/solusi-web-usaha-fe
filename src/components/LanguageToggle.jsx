import { useLanguageStore } from "../store/languageStore"

const LanguageToggle = ({ className = "" }) => {
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)

  const isId = language === "id"

  return (
    <div
      role="group"
      aria-label="Language toggle"
      className={`relative inline-flex items-center p-0.5 rounded-full bg-gray-100/80 border border-gray-200/70 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-white shadow-sm border border-gray-200/60 transition-transform duration-300 ease-out ${
          isId ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <button
        type="button"
        onClick={() => setLanguage("id")}
        aria-pressed={isId}
        className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          isId ? "text-primary-blue" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={!isId}
        className={`relative z-10 px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          !isId ? "text-primary-blue" : "text-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </button>
    </div>
  )
}

export default LanguageToggle
