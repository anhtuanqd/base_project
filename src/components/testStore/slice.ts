import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reducerRegister from '../../redux/store/reducerRegister'
import { State } from '../../redux/typeStore'

export interface StateStore {
  isLoading: boolean
  currentData: string[]
}

export const testGetData = createAsyncThunk('test/GetData', async () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => console.log(data))
})

const fetchCategories = async () => {
  const xhrObject = await fetch('https://jsonplaceholder.typicode.com/')
  const listCats = await apiReducer.fetchData(xhrObject)
  dispatch(fetchCategories({ cates: listCats }))
}

const testStore = createSlice({
  name: 'testStore',
  initialState: {
    isLoading: false,
    currentData: [],
    cates: [],
  } as StateStore,
  reducers: {
    testAccess: (state, action) => {
      state.currentData = action.payload
    },
    fetchCategories: (state, action) => {},
  },
})

export const { testAccess } = testStore.actions
export const getDataStore = (state: State) => state.testStore
reducerRegister.register(testStore.name, testStore.reducer)
