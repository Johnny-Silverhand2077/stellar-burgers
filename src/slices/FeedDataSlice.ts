import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { getFeedsApi } from "@api";
import { getOrderByNumberApi } from "@api";



type TFeedState = {
    orders: TOrder[];
    orderModal: TOrder | null
    loading: boolean;
    total: number;
    totalToday: number;
    error: null | string
}

const initialState: TFeedState = {
    orders: [],
    orderModal: null,
    loading: false,
    total: 0,
    totalToday: 0,
    error: null 
}

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi)

export const getOrderByNumber = createAsyncThunk(
    'feed/getOrder',
    async(number: number, {rejectWithValue}) => {
        try {
            const res = await getOrderByNumberApi(number)
            return res
        } catch (err) {
            return rejectWithValue('Ошибка при получении ленты')
        }
    }
)

export const feedDataSlice = createSlice({
    name: 'feeddata',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.pending, (state) => {
                state.loading = true;

            })
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders
                state.total = action.payload.total
                state.totalToday = action.payload.totalToday
            })
            .addCase(getFeedData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка подачи'
            })
            .addCase(getOrderByNumber.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderByNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.orderModal = action.payload.orders[0]
            })
            .addCase(getOrderByNumber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка подачи'
            })
            
    },
    selectors: {
        getFeedOrders: (state) => state.orders,
        getLoading: (state) => state.loading,
        getTotalEmountOrders: (state) => state.total,
        getTotalEmountToday: (state) => state.totalToday,
        getError: (state) => state.error,
        selectOrderModal: (state) => state.orderModal
    }
})

export const { 
        getFeedOrders,
        getLoading,
        getTotalEmountOrders,
        getTotalEmountToday,
        getError
    } = feedDataSlice.selectors

export default feedDataSlice
