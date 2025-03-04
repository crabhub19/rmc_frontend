import api from "../../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (page=1, { rejectWithValue }) => {
        try {
            const response = await api.get(`products?page=${page}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productStatus: "idle",
        productDetail: null,
        productNext : null,
        productPrevious : null,
        productCount : 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.productStatus = "loading";
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productStatus = "success";
                state.products = action.payload.results;
                state.productNext = action.payload.next;
                state.productPrevious = action.payload.previous;
                state.productCount = action.payload.count;
                state.productDetail = action.payload.detail;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productStatus = "failed";
                state.productDetail = action.payload.detail;
            });
    },
});

export default productSlice.reducer;