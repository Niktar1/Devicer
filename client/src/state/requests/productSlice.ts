import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
    id: number;
    name: string;
    price: number;
    shortDesc: string;
    image: string;
    images: string[];
    countStock: number;
    createdAt: string;
    updatedAt: string;
}
interface fetchProduct {
    loading: boolean,
    products: Product[],
    error?: string,
}

const initialState: fetchProduct = {
    loading: false,
    products: [],
    error: '',
}

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',

    async () => {

        const url = 'http://localhost:3000/products';
        return await axios.get(url, { withCredentials: true })
            .then((response) => response.data)
    })

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error?.message || 'Failed to fetch products';
        })
    },
})

// export const { } = prodcutSlice.actions;

export default productSlice.reducer;