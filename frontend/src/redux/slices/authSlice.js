import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (uData) => {
    const {data} = await axios.post(
        '/api/user/login',
        uData
    ).catch(err => {
        if (err.response.data.message) {
            alert(err.response.data.message)
        } else {
            alert("Ошибка обработки данных...")
        }
    })
    return data
})

export const fetchProtect = createAsyncThunk('auth/fetchProtect', async (user) => {
    return user
})

export const fetchNewToken = createAsyncThunk('auth/fetchNewToken', async () => {
    let old_token = localStorage.getItem('token')
    const {data} = await axios.post('/api/user/auth', {token: old_token})
    console.log(data)
    return data.new_token
})

const initialState = {
    isAuth: false,
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
            state.isAuth = false
            state.user.data = []
            state.user.token = ''
            state.user.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.isAuth = true
            localStorage.setItem('token', action.payload.token)
            let currentTime = new Date()
            currentTime.setHours(currentTime.getHours() + 144)
            localStorage.setItem('life', currentTime)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            state.user.data = action.payload.user
            state.user.token = action.payload.token
            state.user.status = 'loaded'
        },
        [fetchLogin.rejected]: (state) => {
            state.isAuth = false
            state.user.data = []
            state.user.token = ''
            state.user.status = 'error'
        },
        [fetchLogin.pending]: (state) => {
            state.isAuth = false
            state.user.data = []
        },
        [fetchProtect.fulfilled]: (state, action) => {
            state.isAuth = true
            state.user.data = action.payload
        },
        [fetchNewToken.pending]: (state) => {
            state.isAuth = false
            state.user.token = ''
        },
        [fetchNewToken.fulfilled]: (state, action) => {
            state.isAuth = true
            state.user.token = action.payload
        }
    }
})

export const userReducer = userSlice.reducer;