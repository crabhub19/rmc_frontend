import api from "../../api/axiosInstance";
import { createAsyncThunk, createSlice, isFulfilled, isRejected } from "@reduxjs/toolkit";

export const getProductDetail = createAsyncThunk(
    "productDetail/getProductDetail",
    async (slug, { rejectWithValue }) => {
        try {
            const response = await api.get(`product_details/${slug}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productDetailSlice = createSlice({
    name:"productDetail",
    initialState :{
        productDetailData:null,
        productDetailStatus:"idle",
        productDetailDetail:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProductDetail.pending,(state)=>{
                state.productDetailStatus="loading"
            })
            .addCase(getProductDetail.fulfilled,(state,action)=>{
                state.productDetailStatus = "success"
                state.productDetailData = action.payload
                state.productDetailDetail = action.payload.detail
            })
            .addCase(getProductDetail.rejected,(state,action)=>{
                state.productDetailStatus = "failed"
                state.productDetailDetail = action.payload.detail
            })
    }
})

export default productDetailSlice.reducer