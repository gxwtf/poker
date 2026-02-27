import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入本地化资源
import en from './locales/en.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  zh: {
    translation: zh
  }
};

const initialLang = localStorage.getItem('lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;