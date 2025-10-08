import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '~/constants/translations'

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['translations', 'errors'],
  defaultNS: 'translations',
  fallbackLng: 'en'
})

i18n.languages = ['en', 'ua']

export default i18n
