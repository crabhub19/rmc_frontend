import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance"

export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("account/auth/users/me/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        userStatus: "idle",
        userDetail: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.userStatus = "loading";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userStatus = "success";
                state.userData = action.payload;
                state.userDetail = action.payload.detail;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userStatus = "failed";
                state.userDetail = action.payload.detail;
            });
    },
});

export default userSlice.reducer;