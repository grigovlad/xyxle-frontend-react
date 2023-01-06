import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enResource from './locales/en.json';
import deResource from './locales/de.json';

export const locales = [
  {
    key      : 'de',
    resource : deResource
  },
  {
    key      : 'en',
    resource : enResource
  }
];

export const LANGUAGE_RESOURCES = locales.reduce((acc, cur) => ({
  ...acc,
  [cur.key] : {translation : cur.resource}
}), {});

i18n
  .use(initReactI18next)
  .init({
    debug         : false,
    fallbackLng   : 'en',
    interpolation : {
      escapeValue : false
    },
    resources : LANGUAGE_RESOURCES
  });

export default i18n;
