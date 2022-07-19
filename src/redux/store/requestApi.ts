import {
  setDecreaseLoading,
  setErrorState,
  setIncreaseLoading,
} from './sliceLoading'
import store from './store'

export function requestAxios(axiosObj: any) {
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
      store.dispatch(setErrorState(error))
    })
}
