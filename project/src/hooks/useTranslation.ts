import { useApp } from '../context/AppContext';
import { getTranslation, TranslationKey } from '../translations';

export const useTranslation = () => {
  const { language } = useApp();

  const t = (key: TranslationKey): string => {
    return getTranslation(key, language);
  };

  return { t, language };
};