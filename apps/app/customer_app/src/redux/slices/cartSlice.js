import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../services/cartService';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching cart from backend API...');
      const response = await cartService.getCart();
      console.log('Cart fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      return rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, variantId, quantity = 1 }, { rejectWithValue }) => {
    try {
      console.log('Adding to cart API...', { productId, variantId, quantity });
      const response = await cartService.addToCart(productId, variantId, quantity);
      console.log('Add to cart success:', response);
      return response;
    } catch (error) {
      console.error('Add to cart failed:', error);
      return rejectWithValue(error);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      console.log('Updating cart item API...', { itemId, quantity });
      const response = await cartService.updateCartItem(itemId, quantity);
      console.log('Update cart item success:', response);
      return response;
    } catch (error) {
      console.error('Update cart item failed:', error);
      return rejectWithValue(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      console.log('Removing from cart API...', { itemId });
      const response = await cartService.removeFromCart(itemId);
      console.log('Remove from cart success:', response);
      return response;
    } catch (error) {
      console.error('Remove from cart failed:', error);
      return rejectWithValue(error);
    }
  }
);

import { couponService } from '../../services/couponService';

export const fetchAvailableCoupons = createAsyncThunk(
  'cart/fetchAvailableCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await couponService.getAvailableCoupons();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await couponService.applyCoupon(couponCode);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCoupon = createAsyncThunk(
  'cart/removeCoupon',
  async (_, { rejectWithValue }) => {
    try {
      const response = await couponService.removeCoupon();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: null, // Holds the main cart object (subtotal, etc.)
  items: [],  // Holds the cart items for easy mapping
  availableCoupons: [], // Available coupons
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.items = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart';
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add to cart';
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update cart';
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove from cart';
      })
      // Fetch Available Coupons
      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoupons = action.payload?.data || action.payload || [];
      })
      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch coupons';
      })
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload?.data || action.payload; // Typically returns updated cart
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to apply coupon';
      })
      // Remove Coupon
      .addCase(removeCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload?.data || action.payload; // Returns updated cart
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove coupon';
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
