import Cookies from 'js-cookie'

const getSessionDomain = () => {
  return window.location.hostname.replace(/.+?\./, '.')
}

export const has = () => {
  return !!Cookies.get('VERP-TOKEN')
}

export const set = (parameter) => {
  Cookies.set('VERP-TOKEN', parameter, {
    domain: getSessionDomain(),
    expires: 30,
  })
}

export const get = () => {
  return Cookies.get('VERP-TOKEN')
}

export const remove = () => {
  Cookies.remove('VERP-TOKEN', { domain: getSessionDomain() })
  Cookies.remove('VERP-TOKEN')
}

export const getCSRF = () => {
  return Cookies.get('VALIDATION-KEY')
}

export const setLanguage = (lang) => {
  Cookies.set('VERP-LANG', lang, { domain: getSessionDomain(), expires: 30 })
}

export const getLanguage = () => {
  return Cookies.get('VERP-LANG')
}

export const checkValidationKey = (key) => {
  return Cookies.get('VALIDATION-KEY') === key
}
