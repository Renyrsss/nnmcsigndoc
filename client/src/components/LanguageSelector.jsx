import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';

const languages = [
  { code: 'kz', name: 'Қазақ тілі' },
  { code: 'ru', name: 'Русский' },
  // { code: 'en', name: 'English' }, // Раскомментировать при необходимости
];

/**
 * Компонент выбора языка
 */
const LanguageSelector = memo(() => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useStore();
  
  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setLanguage(langCode);
  };
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            py-2 px-4 rounded-full font-bold text-white transition-all
            ${language === lang.code 
              ? 'bg-indigo-700 ring-2 ring-indigo-400' 
              : 'bg-indigo-500 hover:bg-indigo-600'
            }
          `}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;
