import {configureStore} from '@reduxjs/toolkit'
import {consumableReducer, solutionsReducer} from "./slices/slices";

export const store = configureStore({
  reducer: {
    consumable: consumableReducer,
    solutions: solutionsReducer
  }
})

export default store