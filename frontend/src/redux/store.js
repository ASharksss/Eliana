import {configureStore} from '@reduxjs/toolkit'
import {
  archiveReducer,
  completeReducer,
  consumableReducer,
  consumablesNameReducer, perfumesReducer, selectsForCompleteReducer,
  solutionsReducer
} from "./slices/slices";
import {inputSoluteReducer} from "./slices/soluteSlice";

export const store = configureStore({
  reducer: {
    consumable: consumableReducer,
    consumablesName: consumablesNameReducer,
    solutions: solutionsReducer,
    complete: completeReducer,
    selectsForComplete: selectsForCompleteReducer,
    archive: archiveReducer,
    perfumes: perfumesReducer,

    inputSolute: inputSoluteReducer
  }
})

export default store