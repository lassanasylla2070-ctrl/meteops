import { useTranslation as i18useTranslation } from 'react-i18next';
import { Locales, MainLocales } from '@locales/locales.interfaces';

export const useTranslation: <T = MainLocales>(ns: keyof Locales) => { t: (key: keyof T, options?: any) => string } = ns =>
  i18useTranslation(ns as string);
