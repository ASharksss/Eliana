import {configureStore} from '@reduxjs/toolkit'
import {completeReducer, consumableReducer, solutionsReducer} from "./slices/slices";

export const store = configureStore({
  reducer: {
    consumable: consumableReducer,
    solutions: solutionsReducer,
    complete: completeReducer
  }
})

export default store