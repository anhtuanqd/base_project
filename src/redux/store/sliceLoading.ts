import { createSlice } from '@reduxjs/toolkit'
import { State } from '../typeStore'
import reducerRegister from './reducerRegister'

export interface StateLoading {
  isLoading: number
  errorMessage: string
}

const loadingReducer = createSlice({
  name: 'loadingReducer',
  initialState: {
    isLoading: 0,
    errorMessage: '',
  } as StateLoading,
  reducers: {
    setIncreaseLoading: (state: StateLoading) => {
      state.isLoading += 1
    },
    setDecreaseLoading: (state: StateLoading) => {
      state.isLoading = state.isLoading > 0 ? state.isLoading - 1 : 0
    },
    setErrorState: (state, action) => {
      state.errorMessage = action.payload
    },
  },
})

export const getLoadingStore = (state: State) => state.loadingReducer.isLoading
export const { setIncreaseLoading, setDecreaseLoading, setErrorState } =
  loadingReducer.actions
reducerRegister.register(loadingReducer.name, loadingReducer.reducer)
