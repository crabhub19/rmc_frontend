import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/auth/AuthSlice';
import productReducer from '../features/product/ProductSlice';
import productDetailReducer from '../features/product/ProductDetailSlice';
export const store = configureStore({
  reducer: {
    auth : userReducer,
    product: productReducer,
    productDetail: productDetailReducer
  },
});

export default store;