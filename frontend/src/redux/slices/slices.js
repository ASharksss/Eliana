import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchConsumables = createAsyncThunk('getConsumable/fetchConsumable', async () => {
  const {data} = await axios.get('/api/user/getConsumables')
  return data
})

const initialState = {
  consumable: {
    items: [],
    status: 'loading'
  },
  solutions: [],
  completeProducts: [],
  archive: []
}

const consumableSlice = createSlice({
  name: 'consumable',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchConsumables.pending]: (state) => {
      state.consumable.items = []
      state.consumable.status = 'loading'
    },
    [fetchConsumables.fulfilled]: (state, action) => {
      state.consumable.items = action.payload
      state.consumable.status = 'loaded'
    },
    [fetchConsumables.rejected]: (state) => {
      state.consumable.items = []
      state.consumable.status = 'error'
    }
  }
})

export const consumableReducer = consumableSlice.reducer;