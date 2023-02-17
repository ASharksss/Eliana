import {configureStore} from '@reduxjs/toolkit'
import {consumableReducer} from "./slices/slices";

export const store = configureStore({
  reducer: {
    consumable: consumableReducer
  }
})

export default store