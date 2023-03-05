import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (data) => {
    await axios.post(
        '/api/user/login',
        data
    ).then(res => {
        return res
    }).catch(err => {
        if (err.response.data.message) {
            alert(err.response.data.message)
        } else {
            alert("Ошибка обработки данных...")
        }
    })
})

const initialState = {
    user: {
        data: [],
        token: '',
        status: 'loading'
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.user.data = []
            state.user.token = ''
            state.user.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.user.data = action.payload.user
            state.user.token = action.payload.token
            state.user.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.user.data = []
            state.user.token = ''
            state.user.status = 'error'
        }
    }
})

export const userReducer = userSlice.reducer;