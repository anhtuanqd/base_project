import { createSlice } from '@reduxjs/toolkit'
import { getData } from 'api/testApi'
import reducerRegister from 'redux/store/reducerRegister'
import { State } from '../../redux/typeStore'

export interface StateTest {
  list: any
}

const testCallApi = createSlice({
  name: 'testCallApi',
  initialState: {
    list: [],
  } as StateTest,
  reducers: {
    fetchDataTest: (state, action) => {
      state.list = action.payload
    },
  },
})

export const { fetchDataTest } = testCallApi.actions
export const getDataStoree = (state: State) => state.testCallApi.list
reducerRegister.register(testCallApi.name, testCallApi.reducer)
