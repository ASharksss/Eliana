import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchConsumables = createAsyncThunk('getConsumable/fetchConsumable',
  async () => {
    const {data} = await axios.get('/api/user/getConsumables')
    return data
  })
export const fetchSolutions = createAsyncThunk('getSolutions/fetchSolutions', async () => {
  const {data} = await axios.get('/api/user/getSolutions')
  return data
})

export const fetchComplete = createAsyncThunk('getCompleteProducts/fetchComplete', async () => {
  const {data} = await axios.get('/api/user/getCompleteProducts')
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
  completeProducts: {
    items: [],
    status: 'loading'
  },
  archive: {
    items: [],
    status: 'loading'
  }
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

const completeSlice = createSlice({
  name: 'complete',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchComplete.pending]: (state) => {
      state.completeProducts.items = []
      state.completeProducts.status = 'loading'
    },
    [fetchComplete.fulfilled]: (state, action) => {
      state.completeProducts.items = action.payload
      state.completeProducts.status = 'loaded'
    },
    [fetchComplete.rejected]: (state) => {
      state.completeProducts.items = []
      state.completeProducts.status = 'error'
    }
  }
})


export const consumableReducer = consumableSlice.reducer;
export const solutionsReducer = solutionsSlice.reducer;
export const completeReducer = completeSlice.reducer;
