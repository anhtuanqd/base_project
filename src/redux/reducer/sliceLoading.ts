import { createSlice } from '@reduxjs/toolkit'
import { State } from '../typeStore'
import * as session from '../../common/helpers/session'
import reducerRegister from '../store/reducerRegister'

export interface StateLoading {
  isLoading: number
  errorMessage: any
}

const loadingReducer = createSlice({
  name: 'loadingReducer',
  initialState: {
    isLoading: 0,
    errorMessage: {},
  } as StateLoading,
  reducers: {
    setIncreaseLoading: (state: StateLoading) => {
      state.isLoading += 1
    },
    setDecreaseLoading: (state: StateLoading) => {
      state.isLoading = state.isLoading > 0 ? state.isLoading - 1 : 0
    },
    setErrorState: (state, action) => {
      if (action.payload.status === 401) {
        session.remove()
        const callbackUrl = `${window.location.protocol}//${window.location.host}`
        window.location.href = `${process.env.URL_LOGIN}?back_url=${callbackUrl}`
      }
      if (action.payload.status === 403) {
        window.location.href = '/error?code=403'
      }
      state.errorMessage = action.payload
    },
  },
})

export const getLoadingStore = (state: State) => state.loadingReducer.isLoading
export const getErrorStore = (state: State) => state.loadingReducer.errorMessage
export const { setIncreaseLoading, setDecreaseLoading, setErrorState } =
  loadingReducer.actions
reducerRegister.register(loadingReducer.name, loadingReducer.reducer)
