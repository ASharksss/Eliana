import {configureStore} from '@reduxjs/toolkit'
import {
  archiveReducer,
  completeReducer, consumableChemistryReducer,
  consumableReducer,
  consumablesNameReducer, consumableStickersReducer, perfumesReducer, selectsForCompleteReducer,
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
    consumableChemistry: consumableChemistryReducer,
    consumableStickers: consumableStickersReducer,

    inputSolute: inputSoluteReducer
  }
})

export default store