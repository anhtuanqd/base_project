import { StateTest } from 'redux/reducer/sliceTestApi'
import { StateLoading } from '../reducer/sliceLoading'

export type State = {
  loadingReducer: StateLoading
  testCallApi: StateTest
}
