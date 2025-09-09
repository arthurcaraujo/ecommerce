import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import type { CartItem } from "../cart/cartSlice";

export type Order = {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: string;
    userId: string;
    status: "pending"|"paid"|"shipped";
}

export const createOrder = createAsyncThunk(
    "orders/create", async (
        payload: Omit<Order, "id"|"createdAt"|"status">) => {
            return api.post<Order>("/orders", {
                ...payload, createdAt: new Date().toISOString(), status: "pending"
            })
})

export const fetchOrders = createAsyncThunk("orders/fetch", async (userId: string) => {
    return api.get<Order[]>(`/orders?userId=${userId}`)
})

type OrdersState = {
    list: Order[];
    status: "idle"|"loading"|"succeeded"|"failed";
    error?: string
}

const initialState: OrdersState = { list: [], status: "idle" }

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list.unshift(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = String(action.error.message);
            })
            .addCase(fetchOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = "failed";
                state.error = String(action.error.message);
            })
    },
})

export default ordersSlice.reducer;