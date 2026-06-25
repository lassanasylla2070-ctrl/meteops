import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Environment } from '@enums/environment.enum';
import { Language } from '@enums/language.enum';
import { LocalesEN } from './en';
import { Settings } from 'luxon';

const { REACT_APP_INSTANCE_NAME } = process.env;
const isDevelopment = REACT_APP_INSTANCE_NAME === Environment.Development;
Settings.defaultLocale = Language.EN;

// tslint:disable-next-line:no-async-without-await, no-floating-promises
(async () =>
  i18n.use(initReactI18next).init({
    resources: { en: new LocalesEN() },
    fallbackLng: Language.EN,
    debug: isDevelopment,
  }))();
