import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
import addressReducer from './slices/addressSlice';
import searchReducer from './slices/searchSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    address: addressReducer,
    search: searchReducer,
    profile: profileReducer,
  },
});
