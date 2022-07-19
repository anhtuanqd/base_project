import Cookies from 'js-cookie'

export const has = () => {
  return !!Cookies.get('VERP-TOKEN')
}

export const get = () => {
  return Cookies.get('VERP-TOKEN')
}
