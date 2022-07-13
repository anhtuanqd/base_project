import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducerRegister from './reducerRegister';

const store = configureStore({
  reducer: {
    ...reducerRegister.reducers,
  },
});

// reducerRegister.setChangeListener((reducers: any) => {
//   store.replaceReducer(
//     // combineReducers({
//     //   ...reducers,
//     // }),
//   );
// });

export default store;
