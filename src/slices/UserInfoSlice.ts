import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie, deleteCookie } from '../utils/cookie';
import { TUser } from '@utils-types';
import { TRegisterData } from '@api';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  refreshToken,
  fetchWithRefresh
} from '@api';



type TUserState = {
    user: TUser | null;
    loginUserRequst: boolean;
    loginUserError: string | null;
    isAuthChecked: boolean;
    isAuth: boolean;
}

const initialState: TUserState = {
    user: null,
    loginUserRequst: false,
    loginUserError:  null,
    isAuthChecked: false,
    isAuth: false,
}


export const registerUser = createAsyncThunk(
    'user/register', 
    async ({email, password, name }: TRegisterData) => {
        const data = await registerUserApi({ email, password, name })
        setCookie('accessToken', data.accessToken)
        localStorage.setItem('refrecjToken', data.refreshToken)
        return data.user
    }
)

export const loginUser = createAsyncThunk(
    'user/login', 
    async ({email, password}: Omit<TRegisterData,'name'>) =>{
        const data = await loginUserApi({email, password})
        setCookie('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        return data.user
    }    
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_,{ rejectWithValue}) => {
        try {
            await logoutApi();
            deleteCookie('accessToken')
            localStorage.clear()
        } catch (err){
            return rejectWithValue(err)
        }
    }
)

export const checkUserAuth = createAsyncThunk(
   'user/checkUser',
   (_, {dispatch}) => {
    if(getCookie('accessToken')) {
        dispatch(userApi()).finally(() => {
            dispatch(authChecked())
        })
    } else {
        dispatch(authChecked())
    }
   } 
)

export const userApi = createAsyncThunk('user/userApi', getUserApi)
export const updateUser = createAsyncThunk('user/update', updateUserApi)

export const userStateSlice = createSlice({
    name: 'userstate',
    initialState,
    reducers: {
        authChecked: (state) => {
            state.isAuthChecked = true;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) =>{
            state.isAuth = false
            state.loginUserRequst = true
            state.user = null;
        })
        .addCase(registerUser.fulfilled, (state, action) =>{
            state.isAuth = true
            state.loginUserRequst = false
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) =>{
            state.isAuth = false
            state.loginUserRequst = false
            state.loginUserError = action.error.message || 'Не удалось найти зарегистрированного пользователя';
        })
        .addCase(userApi.pending, (state) => {
            state.isAuth = false
            state.loginUserRequst =true
            state.loginUserError = null
            state.user = null
            
        })
        .addCase(userApi.fulfilled, (state, action) => {
            state.isAuth = true
            state.isAuthChecked = true
            state.loginUserRequst = false
            state.user = action.payload.user
        })
        .addCase(userApi.rejected, (state, action) => {
            state.isAuth = false
            state.isAuthChecked = false
            state.loginUserError = action.error.message || 'Не удалось получить пользовательские данные'
            state.loginUserRequst = false
            state.user = null
        })
        .addCase(loginUser.pending, (state) => {
            state.isAuthChecked = true
            state.loginUserRequst = true
            state.loginUserError = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isAuth = true
            state.isAuthChecked = true
            state.loginUserRequst = false
            state.user = action.payload
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isAuth = false
            state.isAuthChecked = true
            state.user = null
            state.loginUserError = action.error.message || 'Не удалось найти пользователя, вошедшего в систему'
        })
        .addCase(logoutUser.pending, (state) => {
            state.isAuth = true
            state.loginUserRequst = true
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.isAuth = false
            state.user = null
            state.loginUserRequst = false
            localStorage.removeItem('refreshToken')
            deleteCookie('accessToken')
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isAuth = false
            state.loginUserRequst = false
            state.loginUserError = action.error.message || 'Не удалось найти пользователя, вышедшего из системы'
        })
        .addCase(updateUser.pending, (state) => {
            state.isAuth = true
            state.loginUserRequst = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isAuth = true
            state.loginUserRequst = false
            state.user = action.payload.user
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loginUserRequst = false
            state.loginUserError = action.error.message || 'Не удалось получить обновление пользователя'
        })
    },
    selectors: {
        selectUser: (state) => state.user,
        selectLoginUserRequst: (state) => state.loginUserRequst,
        selectLoginUserError: (state) => state.loginUserError,
        selectIsAuthChecked: (state) => state.isAuthChecked,
        selectIsAuth: (state) => state.isAuth
    }
})


export const {
    selectUser,
    selectLoginUserRequst,
    selectLoginUserError,
    selectIsAuthChecked,
    selectIsAuth,   
} = userStateSlice.selectors

export default userStateSlice
export const { authChecked } = userStateSlice.actions
