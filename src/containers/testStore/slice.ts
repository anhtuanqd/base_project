import { createAsyncThunk, createSlice, isAllOf } from '@reduxjs/toolkit'
import reducerRegister from '../../redux/store/reducerRegister'
import { State } from '../../redux/typeStore'
import { get } from '../../service/service'

export interface StateStore {
  isLoading: boolean
  currentData: string[]
  error: ''
}

export const handleLoading = (action: any, state: any) => {
  state.isloading = action.type.endsWith('/pending')
}

export const handleError = (action: any, state: any) => {
  state.error = action.type.endsWith('/rejected')
}

export const getAccessCodeRequest = createAsyncThunk<void>(
  'registration/getAccessCodeRequest',
  async () => {
    const a = await get('todos')
    return a
  },
)

const testStore = createSlice({
  name: 'testStore',
  initialState: {
    isLoading: false,
    currentData: [],
    error: '',
  } as StateStore,
  reducers: {
    testAccess: (state, action) => {
      state.currentData = action.payload
    },
  },
})

export const { testAccess } = testStore.actions
export const getDataStore = (state: State) => state.testStore.currentData
reducerRegister.register(testStore.name, testStore.reducer)
