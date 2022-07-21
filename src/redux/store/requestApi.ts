import {
  setDecreaseLoading,
  setErrorState,
  setIncreaseLoading,
} from '../reducer/sliceLoading'
import store from './store'

export const requestAxios = (axiosObj: any) => {
  const startRequest = () => {
    store.dispatch(setIncreaseLoading())
  }

  const finishedRequest = () => {
    store.dispatch(setDecreaseLoading())
  }
  startRequest()
  return axiosObj
    .then((response: any) => {
      finishedRequest()
      return response
    })
    .catch((error: any) => {
      finishedRequest()
      createAxiosErrorAction(error)
    })
}

export const createAxiosErrorAction = (error) => {
  const response = error.response
  let payload = {}

  if (error.response && error.response.data && error.response.data.message) {
    const message =
      typeof error.response.data.message === 'object'
        ? JSON.stringify(error.response.data.message)
        : error.response.data.message
    payload = {
      status: response.status,
      messageCode: response.data.code ? response.data.code : response.status,
      message,
    }
  } else {
    let message = 'Cannot connect network. Please check and try again.'
    if (error.message) {
      message += `[${error.message}]`
    }
    payload = {
      status: null,
      messageCode: null,
      message,
    }
  }

  return store.dispatch(setErrorState(payload))
}
