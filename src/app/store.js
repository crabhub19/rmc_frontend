import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import productReducer from '../features/product/ProductSlice';
import productDetailReducer from '../features/product/ProductDetailSlice';
import userReducer from '../features/auth/UserSlice';  
export const store = configureStore({
  reducer: {
    auth : authReducer,
    product: productReducer,
    productDetail: productDetailReducer,
    user : userReducer,
  },
});

export default store;