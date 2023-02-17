import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchConsumables = createAsyncThunk('getConsumable/fetchConsumable',
  async () => {
    const {data} = await axios.get('/api/user/getConsumables')
    return data
  })
// не работает
export const fetchSolutions = createAsyncThunk('getSolutions/fetchSolutions', async () => {
  const {data} = await axios.get('/api/user/getSolutions')
  return data
})

const initialState = {
  consumable: {
    items: [],
    status: 'loading'
  },
  solutions: {
    items: [],
    status: 'loading'
  },
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

const solutionsSlice = createSlice({
  name: 'solutions',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchSolutions.pending]: (state) => {
      state.solutions.items = []
      state.solutions.status = 'loading'
    },
    [fetchSolutions.fulfilled]: (state, action) => {
      state.solutions.items = action.payload
      state.solutions.status = 'loaded'
    },
    [fetchSolutions.rejected]: (state) => {
      state.solutions.items = []
      state.solutions.status = 'error'
    }
  }
})



export const consumableReducer = consumableSlice.reducer;
export const solutionsReducer = solutionsSlice.reducer;
