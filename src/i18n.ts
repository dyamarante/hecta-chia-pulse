
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Carregamento de traduções usando http
  .use(Backend)
  // Detecção automática do idioma
  .use(LanguageDetector)
  // Integração com React
  .use(initReactI18next)
  // Inicialização
  .init({
    // Idioma padrão
    fallbackLng: 'pt',
    // Idiomas suportados
    supportedLngs: ['pt', 'en', 'zh', 'ar'],
    // Modo de debug (desativado em produção)
    debug: process.env.NODE_ENV === 'development',
    // Configurações de interpolação
    interpolation: {
      escapeValue: false, // Não é necessário para React
    },
    // Configuração de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'hectachia-language',
      caches: ['localStorage'],
    },
    // Configuração do backend para carregar as traduções
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    // Namespaces de tradução
    ns: ['common', 'contact', 'certifications', 'home', 'notfound'],
    defaultNS: 'common',
  });

// Exportar a função para mudar o idioma e direção do documento
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  
  // Definir direção do documento para RTL se for árabe
  if (lng === 'ar') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = lng;
    document.body.classList.add('rtl');
  } else {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
    document.body.classList.remove('rtl');
  }
};

export default i18n;
