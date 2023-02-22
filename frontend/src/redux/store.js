import {configureStore} from '@reduxjs/toolkit'
import {
  archiveReducer,
  completeReducer,
  consumableReducer,
  consumablesNameReducer,
  solutionsReducer
} from "./slices/slices";

export const store = configureStore({
  reducer: {
    consumable: consumableReducer,
    consumablesName: consumablesNameReducer,
    solutions: solutionsReducer,
    complete: completeReducer,
    archive: archiveReducer
  }
})

export default store