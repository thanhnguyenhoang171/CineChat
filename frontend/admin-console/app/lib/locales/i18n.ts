'use client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { i18nResources } from '~/constants/app/i18n-resource-constant';

i18n
  .use(LanguageDetector) // Auto detect browser language
  .use(initReactI18next) // Binding for React
  .init({
    resources: i18nResources,
    fallbackLng: 'vi',
    ns: ['app', 'login', 'register', 'logout'], // Các namespace
    defaultNS: 'app', // Namespace mặc định nếu không chỉ định

    interpolation: {
      escapeValue: false, // React đã tự handle XSS nên không cần escape
    },

    detection: {
      order: ['cookie', 'navigator'], // check cookie first
      caches: ['cookie'], // auto store
      lookupCookie: 'app_lang', // cookie name

      // options
      cookieMinutes: 10080, // 7 days
      cookieOptions: { path: '/', sameSite: 'lax' },
    },
  });

export default i18n;
