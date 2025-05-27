
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
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
      useSuspense: true
    }
  });

export const changeLanguage = (lng: string) => {
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
