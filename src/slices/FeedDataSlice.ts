import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { getFeedsApi } from "@api";


type TFeedState = {
    orders: TOrder[];
    loading: boolean;
    total: number;
    totalToday: number;
    error: null | string
}

const initialState: TFeedState = {
    orders: [],
    loading: false,
    total: 0,
    totalToday: 0,
    error: null 
}

export const getFeedData = createAsyncThunk('feed/data', getFeedsApi)

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
    },
    selectors: {
        getFeedOrders: (state) => state.orders,
        getLoading: (state) => state.loading,
        getTotalEmountOrders: (state) => state.total,
        getTotalEmountToday: (state) => state.totalToday,
        getError: (state) => state.error
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
