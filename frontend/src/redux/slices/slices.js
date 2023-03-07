import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchConsumables = createAsyncThunk('getConsumable/fetchConsumable',
  async () => {
    const { data } = await axios.get('/api/user/getConsumables')
    return data
  })

export const fetchConsumablesChemistry = createAsyncThunk('getConsumablesChemistry/fetchConsumablesChemistry',
  async () => {
    const { data } = await axios.get('/api/user/getConsumablesChemistry')
    return data
  })

export const fetchConsumablesStickers = createAsyncThunk('getConsumablesStickers/ConsumablesStickers',
  async () => {
    const { data } = await axios.get('/api/user/getConsumablesStickers')
    return data
  })

export const fetchSolutions = createAsyncThunk('getSolutions/fetchSolutions', async () => {
  const { data } = await axios.get('/api/user/getSolutions')
  return data
})

export const addSolutions = createAsyncThunk('addSolution', async (data) => {
  await axios.post(
    '/api/user/addSolution',
    data
  ).then(res => {
    alert('Добавлено')
  })
    .catch(err => {
      if (err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert("Ошибка обработки данных...")
      }
    })
})

export const addComplete = createAsyncThunk('addComplete', async (data) => {
  await axios.post(
    '/api/user/addComplete',
    data
  ).then(res => {
    alert(res)
  }).catch(err => {
    alert(err.message)
  })
})

export const fetchComplete = createAsyncThunk('getCompleteProducts/fetchComplete', async () => {
  const { data } = await axios.get('/api/user/getCompleteProducts')
  return data
})

export const fetchArchive = createAsyncThunk('getArchive/fetchArchive', async () => {
  const { data } = await axios.get('/api/user/getArchive')
  return data
})

export const fetchConsumablesName = createAsyncThunk('getConsumable/fetchConsumableName', async () => {
  const { data } = await axios.get('/api/user/getNamesConsumables')
  return data
})

export const fetchSelectsForComplete = createAsyncThunk('getSelectsForComplete/fetchSelectsForComplete', async () => {
  const { data } = await axios.get('/api/user/getSelectsForComplete')
  return data
})


export const fetchPerfumes = createAsyncThunk('getPerfumes/fetchPerfumes', async () => {
  const { data } = await axios.get('/api/user/getPerfumes')
  return data
})

export const addConsumable = createAsyncThunk('addConsume', async (data) => {
  await axios.post(
    '/api/user/addConsume',
    data
  ).then(res => {
    alert('Добавлено')
  })
    .catch(err => {
      alert(err.message)
    })
})

export const addArchive = createAsyncThunk('addArchive', async (data) => {
  await axios.post(
    '/api/user/addArchive',
    data
  ).then(res => {
    alert('Добавлено')
  })
    .catch(err => {
      alert(err)
    })
})

const initialState = {
  consumable: {
    items: [],
    status: 'loading'
  },
  consumableChemistry: {
    items: [],
    status: 'loading'
  },
  consumableStickers: {
    items: [],
    status: 'loading'
  },
  consumablesName: {
    items: [],
    status: 'loading'
  },
  perfumes: {
    items: [],
    status: ' loading'
  },
  solutions: {
    items: [],
    status: 'loading'
  },
  completeProducts: {
    items: [],
    status: 'loading'
  },
  selectsForComplete: {
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

const consumableChemistrySlice = createSlice({
  name: 'consumableChemistry',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchConsumablesChemistry.pending]: (state) => {
      state.consumableChemistry.items = []
      state.consumableChemistry.status = 'loading'
    },
    [fetchConsumablesChemistry.fulfilled]: (state, action) => {
      state.consumableChemistry.items = action.payload
      state.consumableChemistry.status = 'loaded'
    },
    [fetchConsumablesChemistry.rejected]: (state) => {
      state.consumableChemistry.items = []
      state.consumableChemistry.status = 'error'
    }
  }
})

const consumableStickersSlice = createSlice({
  name: 'consumableStickers',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchConsumablesStickers.pending]: (state) => {
      state.consumableStickers.items = []
      state.consumableStickers.status = 'loading'
    },
    [fetchConsumablesStickers.fulfilled]: (state, action) => {
      state.consumableStickers.items = action.payload
      state.consumableStickers.status = 'loaded'
    },
    [fetchConsumablesStickers.rejected]: (state) => {
      state.consumableStickers.items = []
      state.consumableStickers.status = 'error'
    }
  }
})


const consumablesNameSlice = createSlice({
  name: 'consumablesName',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchConsumablesName.pending]: (state) => {
      state.consumablesName.items = []
      state.consumablesName.status = 'loading'
    },
    [fetchConsumablesName.fulfilled]: (state, action) => {
      state.consumablesName.items = action.payload
      state.consumablesName.status = 'loaded'
    },
    [fetchConsumablesName.rejected]: (state) => {
      state.consumablesName.items = []
      state.consumablesName.status = 'error'
    }
  }
})

const perfumesSlice = createSlice({
  name: 'perfumes',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPerfumes.pending]: (state) => {
      state.perfumes.items = []
      state.perfumes.status = 'loading'
    },
    [fetchPerfumes.fulfilled]: (state, action) => {
      state.perfumes.items = action.payload
      state.perfumes.status = 'loaded'
    },
    [fetchPerfumes.rejected]: (state) => {
      state.perfumes.items = []
      state.perfumes.status = 'error'
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

const selectsForComplete = createSlice({
  name: 'selectsForComplete',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchSelectsForComplete.pending]: (state) => {
      state.selectsForComplete.items = []
      state.selectsForComplete.status = 'loading'
    },
    [fetchSelectsForComplete.fulfilled]: (state, action) => {
      state.selectsForComplete.items = action.payload
      state.selectsForComplete.status = 'loaded'
    },
    [fetchSelectsForComplete.rejected]: (state) => {
      state.selectsForComplete.items = []
      state.selectsForComplete.status = 'error'
    }
  }
})

const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducer: {},
  extraReducers: {
    [fetchArchive.pending]: (state) => {
      state.archive.items = []
      state.archive.status = 'loading'
    },
    [fetchArchive.fulfilled]: (state, action) => {
      state.archive.items = action.payload
      state.archive.status = 'loaded'
    },
    [fetchArchive.rejected]: (state) => {
      state.archive.items = []
      state.archive.status = 'error'
    }
  }
})



export const consumableReducer = consumableSlice.reducer;
export const solutionsReducer = solutionsSlice.reducer;
export const completeReducer = completeSlice.reducer;
export const archiveReducer = archiveSlice.reducer;
export const consumablesNameReducer = consumablesNameSlice.reducer;
export const perfumesReducer = perfumesSlice.reducer;
export const selectsForCompleteReducer = selectsForComplete.reducer;
export const consumableChemistryReducer = consumableChemistrySlice.reducer;
export const consumableStickersReducer = consumableStickersSlice.reducer;
