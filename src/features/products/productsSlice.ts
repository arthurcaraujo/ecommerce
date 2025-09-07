import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export type Product = {
    description?: string;
    id: string;
    image?: string;
    price: number;
    title: string;
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    return api.get<Product[]>("/products")
})

export const fetchProduct = createAsyncThunk("products/fetchOne", async (id: string) => {
    return api.get<Product>(`/products/${id}`)
})

type ProductsState = {
    list: Product[];
    current: Product | null;
    status: "idle"|"loading"|"succeeded"|"failed";
    error?: string;
}

const initialState: ProductsState = {
    list: [],
    current: null,
    status: "idle"
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
    builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = "loading" })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeeded"; state.list = action.payload })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed"; state.error = String(action.error.message) })
        .addCase(fetchProduct.pending, (state) => {
            state.status = "loading" })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = "succeeded"; state.current = action.payload })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = "failed"; state.error = String(action.error.message) })
    },
})

export default productsSlice.reducer;