import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getData } from 'api/testApi'
import reducerRegister from 'redux/store/reducerRegister'
import { requestAxios } from 'redux/store/requestApi'
import { State } from '../typeStore'

export interface StateTest {
  list: any
}

export const getDataTodo = createAsyncThunk('fetchData/Todo', async () => {
  const fetch = async () => {
    const data = await getData()
    return data.data
  }
  const a = await requestAxios(fetch())
  return a
})

const testCallApi = createSlice({
  name: 'testCallApi',
  initialState: {
    list: [],
  } as StateTest,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataTodo.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export const getDataStoree = (state: State) => state.testCallApi.list
reducerRegister.register(testCallApi.name, testCallApi.reducer)
