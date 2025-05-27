
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const initializeI18n = async () => {
  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'pt',
      supportedLngs: ['pt', 'en', 'zh', 'ar'],
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'hectachia-language',
        caches: ['localStorage'],
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      ns: ['common', 'contact', 'certifications', 'home', 'notfound'],
      defaultNS: 'common',
      react: {
        useSuspense: false // Changed back to false to handle loading manually
      },
      // Pre-load all namespaces
      preload: ['pt', 'en', 'zh', 'ar'],
      load: 'languageOnly'
    });

  // Pre-load the certifications namespace for all languages
  const currentLng = i18n.language || 'pt';
  await Promise.all([
    i18n.loadNamespaces(['certifications', 'common']),
    i18n.changeLanguage(currentLng)
  ]);
};

// Initialize i18n
initializeI18n();

export const changeLanguage = async (lng: string) => {
  // Ensure all namespaces are loaded before changing language
  await i18n.loadNamespaces(['common', 'contact', 'certifications', 'home', 'notfound']);
  
  return i18n.changeLanguage(lng).then(() => {
    if (lng === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lng;
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lng;
      document.body.classList.remove('rtl');
    }
  });
};

export default i18n;
