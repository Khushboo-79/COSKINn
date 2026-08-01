import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching products with params:', params);
      const response = await productService.getProducts(params);
      console.log('Products fetched successfully:', response);
      return response; // Assumes response contains the array of products directly or in a specific field
    } catch (error) {
      console.error('Error fetching products:', error);
      return rejectWithValue(error);
    }
  }
);

export const fetchProductReviews = createAsyncThunk(
  'product/fetchProductReviews',
  async (productId, { rejectWithValue }) => {
    try {
      console.log(`Fetching reviews for product ${productId}...`);
      const response = await productService.getProductReviews(productId);
      return response;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return rejectWithValue(error);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      console.log(`Fetching product ${productId}...`);
      const response = await productService.getProductById(productId);
      return response;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  items: [], // Will hold the array of products
  currentProduct: null, // Holds the currently viewed product
  reviews: [], // Hold reviews for the current product
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.items = [];
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.reviews = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('fetchProducts.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('fetchProducts.fulfilled');
        state.loading = false;
        // Check if the backend returns an array or an object like { data: [...] }
        let fetchedProducts = Array.isArray(action.payload) ? action.payload : (action.payload?.data || action.payload?.items || action.payload?.products || []);

        state.items = fetchedProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log('fetchProducts.rejected', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
        state.items = [];
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload?.data || action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch product details';
      })
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.data || action.payload || [];
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch reviews';
      });
  },
});

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
