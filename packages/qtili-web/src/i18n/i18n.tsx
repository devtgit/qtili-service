import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from './ru.json'

export const defaultNS = 'translate'
export const resources = {
  ru: {
    [defaultNS]: ru,
  },
} as const

i18n.use(initReactI18next).init({
  lng: 'ru',
  ns: [defaultNS],
  defaultNS,
  resources,
})
