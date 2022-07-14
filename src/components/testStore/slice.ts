import { createSlice } from '@reduxjs/toolkit';
import reducerRegister from '../../redux/store/reducerRegister';
import { State } from '../../redux/typeStore';

export interface StateStore {
  isLoading: boolean;
  currentData: string[];
}

const testStore = createSlice({
  name: 'testStore',
  initialState: {
    isLoading: false,
    currentData: [],
  },
  reducers: {
    testAccess: (state, action) => {
      state.currentData = action.payload;
    },
  },
});
export const { testAccess } = testStore.actions;
export const getDataStore = (state: State) => state.testStore;
reducerRegister.register(testStore.name, testStore.reducer);
