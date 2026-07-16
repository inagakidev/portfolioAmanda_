import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import pt from './locales/pt/translation.json';

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language?.startsWith('en') ? 'en' : 'pt';
  i18n.on('languageChanged', (language) => {
    document.documentElement.lang = language?.startsWith('en') ? 'en' : 'pt';
  });
}

export default i18n;
