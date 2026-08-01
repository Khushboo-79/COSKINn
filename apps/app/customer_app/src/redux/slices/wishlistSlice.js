import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistService } from '../../services/wishlistService';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching wishlist from backend API...');
      const response = await wishlistService.getWishlist();
      console.log('Wishlist fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return rejectWithValue(error);
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { getState, dispatch, rejectWithValue }) => {
    let isWishlisted = false;
    try {
      console.log(`Toggling wishlist for product ID: ${productId}`);
      const state = getState();
      const items = state.wishlist.items;
      isWishlisted = items.some(item => item.productId === productId);
      
      // Dispatch optimistic update
      dispatch(wishlistSlice.actions.optimisticToggle({ productId, isWishlisted }));
      
      let response;
      if (isWishlisted) {
        console.log('Product is already in wishlist. Calling DELETE API...');
        response = await wishlistService.removeFromWishlist(productId);
        console.log('Product removed from wishlist successfully!');
      } else {
        console.log('Product not in wishlist. Calling POST API...');
        response = await wishlistService.addToWishlist(productId);
        console.log('Product added to wishlist successfully!');
      }
      return response;
    } catch (error) {
      console.error('Error toggling wishlist API:', error);
      dispatch(wishlistSlice.actions.revertToggle({ productId, isWishlisted }));
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
    optimisticToggle: (state, action) => {
      const { productId, isWishlisted } = action.payload;
      if (isWishlisted) {
        state.items = state.items.filter(item => item.productId !== productId);
      } else {
        state.items.push({ productId, isOptimistic: true });
      }
    },
    revertToggle: (state, action) => {
      const { productId, isWishlisted } = action.payload;
      if (isWishlisted) {
        // Was originally wishlisted, so add it back
        state.items.push({ productId, isOptimistic: true });
      } else {
        // Was not wishlisted, so remove it
        state.items = state.items.filter(item => item.productId !== productId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch wishlist';
      })
      
      .addCase(toggleWishlist.pending, (state) => {
        // Optimistic UI handled manually via optimisticToggle action
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        // The real backend response comes back with full product data
        state.items = action.payload?.items || [];
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update wishlist';
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
