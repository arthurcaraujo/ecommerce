import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    image?: string;
    price: number;
    quantity: number;
    title: string;
}
type CartState = { items: CartItem[] }

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) state.items[itemIndex].quantity += action.payload.quantity;
            else state.items.push(action.payload);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        setQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const item = state.items.find((x) => x.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        },
        clearCart(state) {
            state.items = [];
        },
    },
})

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;