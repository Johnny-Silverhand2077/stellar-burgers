import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { getOrdersApi } from "@api";

type TOrtdersHistoryState = {
    orders: TOrder[];
    loading: boolean;
    error: null | undefined | string;
}

export const initialState: TOrtdersHistoryState = {
    orders: [],
    loading: false,
    error: null
}


export const ordersHistory = createAsyncThunk(
    'user/ordershistory',
    getOrdersApi
)

export const userOrderHistorySlice = createSlice({
    name: 'ordershistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ordersHistory.pending, (state) => {
                (state.loading = true), (state.error = null)
            })
            .addCase(ordersHistory.fulfilled, (state, action) => {
                (state.loading = false), (state.error = null),
                (state.orders = action.payload)
            })
            .addCase(ordersHistory.rejected, (state , action) => {
                (state.loading = false), (state.error = action.error.message || 'Ошибка истории заказов')
            })
    },
    selectors: {
        getUserOrdersLoading: (state) => state.loading,
        getUserOrdersHistory: (state) => state.orders,
        getUserOrdersHistoryError: (state) => state.error,
    }
})



export const {
    getUserOrdersLoading,
    getUserOrdersHistory,
    getUserOrdersHistoryError
} = userOrderHistorySlice.selectors

export default userOrderHistorySlice;
