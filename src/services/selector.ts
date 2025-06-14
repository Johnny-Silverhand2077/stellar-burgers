import { RootState } from "./store";

export const selectOrderId = (num: number) => (state: RootState) => {
    if(state.feeddata.orders.length || state.ordershistory.orders.length) {
        return (
            state.feeddata.orders.find((order) => order.number === num) || 
            state.ordershistory.orders.find((order) => order.number === num)
        )
    } 
    if(state.feeddata.orderModal) {
        return state.feeddata.orderModal.number === num
        ? state.feeddata.orderModal
        : null
    }
    return null
}
