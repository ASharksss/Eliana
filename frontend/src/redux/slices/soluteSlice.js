import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchConsumables} from "./slices";

export const addSoluteData = createAsyncThunk('solute/inputData/added', async (data) => {
  return data
})

const initialState = {
  inputData: []
}

const inputSoluteSlice = createSlice({
  name: 'inputSolute',
  initialState,
  reducer: {},
  extraReducers: {
    [addSoluteData.pending]: (state) => {
      state.inputData = []
    },
    [addSoluteData.fulfilled]: (state, action) => {
      state.inputData = prevState => {
        if(prevState.name === action.payload.name){
          return prevState.count += action.payload.count
        } else {
          return [...prevState, action.payload]
        }
      }
    },
    [addSoluteData.rejected]: (state) => {
      state.consumable = []
    }
  }
})

export const inputSoluteReducer = inputSoluteSlice.reducer;