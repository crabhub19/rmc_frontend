import api from "../../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("products");
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
        ProductNext : null,
        ProductPrevious : null,
        ProductCount : 0
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
                state.ProductNext = action.payload.next;
                state.ProductPrevious = action.payload.previous;
                state.ProductCount = action.payload.count;
                state.productDetail = action.payload.detail;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productStatus = "failed";
                state.productDetail = action.payload.detail;
            });
    },
});

export default productSlice.reducer;