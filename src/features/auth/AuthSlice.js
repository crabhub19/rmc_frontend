import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axiosInstance"
import { jwtDecode } from 'jwt-decode';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("account/auth/users/", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resendEmail = createAsyncThunk(
    "auth/resendEmail",
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post("account/auth/users/resend_activation/", email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (verifyData, { rejectWithValue }) => {
        try {
            const response = await api.post("account/auth/users/activation/", verifyData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post("account/auth/jwt/create/", userData);
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            const decode_access_token = jwtDecode(response.data.access);
            const user_id = decode_access_token.user_id;
            localStorage.setItem("user_id", user_id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }

    }
);

export const googleAuth = createAsyncThunk(
    "auth/googleAuth",
    async (token, { rejectWithValue }) => {
        try {
            const response = await api.post(
                `account/auth/google/`,{access_token:token}
            );
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token",response.data.refresh)
            return response.data;
        } catch (error) {   
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user_id: localStorage.getItem("user_id") ||  null,
        access_token : localStorage.getItem("access_token") || null,
        refresh_token: localStorage.getItem("refresh_token") || null,
        authStatus: "idle",
        authDetail: null,
    },
    reducers: {
        logoutUser(state) {
            state.user_id = null;
            state.access_token = null;
            state.refresh_token = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.authStatus = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authStatus = "success";
                state.user = action.payload;
                state.authDetail = action.payload.detail;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authStatus = "failed";
                state.authDetail = action.payload.detail;
            })
            .addCase(loginUser.pending, (state) => {
                state.authStatus = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.authStatus = "success";
                state.user = action.payload;
                state.authDetail = action.payload.detail;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authStatus = "failed";
                state.authDetail = action.payload.detail;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.authStatus = "loading";
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.authStatus = "success";
                state.authDetail = action.payload.detail;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.authStatus = "failed";
                state.authDetail = action.payload.detail;
            })
            .addCase(googleAuth.pending, (state) => {
                state.authStatus = "loading";
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.authStatus = "success";
                state.authDetail = action.payload.detail;
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.authStatus = "failed";
                state.authDetail = action.payload.detail;
            })

    },
});


export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
