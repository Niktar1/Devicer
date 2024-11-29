import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    // anonymousId: number;
    error?: string,
}

const initialState: AuthState = {
    // anonymousId: 0,
    error: '',
}

export const fetchBasket = createAsyncThunk(
    "auth/fetchBasket",
    async () => {
        const url = 'http://localhost:3000/baskets';

        return await axios.get(url, { withCredentials: true }).then((response) => response.data)
        // response.data => state.anonymousId = action.payload;
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasket.pending, () => {
            // console.log("fetchBaket.pending");
        })
            .addCase(fetchBasket.fulfilled, (state, action) => {
                // state.anonymousId = action.payload;
            })
            .addCase(fetchBasket.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to fetch basket';
            })
    }
});


export const { } = authSlice.actions;

export default authSlice.reducer;