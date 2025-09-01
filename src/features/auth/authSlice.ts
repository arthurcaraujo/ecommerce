import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    email: string;
    name: string;
};
type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
};

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;