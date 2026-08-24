// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to the Application",
      "logout": "Logout",
      // Add all your English translations here
    },
  },
  od: {
    translation: {
      "welcome": "ଆପ୍ଲିକେସନକୁ ସ୍ଵାଗତ",
      "logout": "ଲଗଅଉଟ୍",
      // Add all your Odia translations here
    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en", // fallback language if translation is missing
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
