import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationES from './es.json';
import translationEN from './en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: translationES },
      en: { translation: translationEN }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false // React ya escapa por defecto
    }
  });

export default i18n;
