import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhTranslation from './zh-CN/index';  
import enTranslation from './en/index';  
const resources = {
  'zh-CN': {
    translation: zhTranslation,
  },
  'en': {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh-CN', // 默认语言  
  fallbackLng: 'zh-CN', // 当检测不到语言时使用的语言  
  interpolation: {  
    escapeValue: false, // 不转义值  
  }, 
});


export function changeLanguage(lng: string) {  
  i18n.changeLanguage(lng);  
}