import { combineReducers, configureStore } from '@reduxjs/toolkit'
import reducerRegister from './reducerRegister'
import { reducer as formReducer } from 'redux-form'

const store = configureStore({
  reducer: {
    ...reducerRegister.reducers,
    form: formReducer,
  },
})

reducerRegister.setChangeListener((reducers: object) => {
  return store.replaceReducer(
    combineReducers({
      ...reducers,
    }),
  )
})

export default store
