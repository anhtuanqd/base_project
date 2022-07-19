import { StateTest } from 'redux/reducer/testReducerApi'
import { StateStore } from '../../containers/testStore/slice'
import { StateLoading } from '../store/sliceLoading'

export type State = {
  testStore: StateStore
  loadingReducer: StateLoading
  testCallApi: StateTest
}
