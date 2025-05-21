
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Loading translations using http
  .use(Backend)
  // Automatic language detection
  .use(LanguageDetector)
  // React integration
  .use(initReactI18next)
  // Initialization
  .init({
    // Default language
    fallbackLng: 'pt',
    // Supported languages
    supportedLngs: ['pt', 'en', 'zh', 'ar'],
    // Debug mode (disabled in production)
    debug: process.env.NODE_ENV === 'development',
    // Interpolation settings
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'hectachia-language',
      caches: ['localStorage'],
    },
    // Backend configuration to load translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Translation namespaces
    ns: ['common', 'contact', 'certifications', 'home', 'notfound'],
    defaultNS: 'common',
    react: {
      useSuspense: false // This helps avoid issues during language switching
    }
  });

// Export the function to change language and document direction
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng).then(() => {
    // Change document direction to RTL if Arabic
    if (lng === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lng;
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lng;
      document.body.classList.remove('rtl');
    }
    
    // We're removing the force reload to let React and i18next handle the re-rendering
    // window.location.reload(); <- Removed this line
  });
};

export default i18n;
