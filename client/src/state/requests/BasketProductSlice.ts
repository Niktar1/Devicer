import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Product } from "./productSlice";


interface BasketProductState {
    loading: boolean
    products: Product[]
    error?: string
}

const initialState: BasketProductState = {
    loading: false,
    products: [],
    error: '',
}


export const basketProductsAsync = createAsyncThunk(
    "BasketProduct/basketProductsAsync",
    async () => {
        const url = "http://localhost:3000/baskets/basketProducts";
        return await axios.get(url, { withCredentials: true }).then((response) => response.data)
    }
)


export const addToBasketAsync = createAsyncThunk(
    "BasketProduct/addToBasketAsync",

    async (productId: number) => {
        const url = 'http://localhost:3000/baskets/addproduct';
        console.log(".addToBasketAsync: prodcutId:\n");
        console.log(productId);
        return await axios.post(url, { productId: productId }, { withCredentials: true }).then((response) => response.data)
    }
)

export const removeProductAsync = createAsyncThunk(
    "BasketProduct/removeProductAsync",

    async (productId: number) => {
        const url = 'http://localhost:3000/baskets/removeProduct';
        // const response = await axios.post(url, { productId: productId }, { withCredentials: true }).then((response) => response.data)
        // return response;
    }
)

export const fetchBasketProduct = createAsyncThunk(
    "BasketProduct/fetchBasketProduct",
    async (productId: number) => {

        const url = 'http://localhost:3000/baskets/getProduct';
        return await axios.post(url, { productId: productId },).then((response) => response.data)
    }
)

const BasketProductSlice = createSlice({
    name: "BasketProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToBasketAsync.pending, () => {
            })
        builder.addCase(addToBasketAsync.fulfilled, (state, action) => {
            // state.products = action.payload.products;
        })
            .addCase(addToBasketAsync.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to add products';
                console.log(state.error);
            })

        builder.addCase(removeProductAsync.fulfilled, (state, action) => {
            // state.products = action.payload.products;
        })
            .addCase(removeProductAsync.rejected, (state, action) => {
                state.error = action.error?.message || 'Failed to remove product';
                console.log(state.error);
            })

        builder.addCase(basketProductsAsync.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
            console.log(action.payload);
        })
            .addCase(basketProductsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error?.message || 'Failed to fetch basket products';
            })
        builder.addCase(fetchBasketProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(fetchBasketProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error?.message || 'Failed to fetch basket products'
        })
    }
});

export const { } = BasketProductSlice.actions;

export default BasketProductSlice.reducer;