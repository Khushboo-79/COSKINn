import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ query, segment }, { rejectWithValue }) => {
    try {
      console.log(`[Redux] Fetching search results for: "${query}" in segment: ${segment}`);
      const results = await productService.searchProducts(query, segment);
      return { query, results };
    } catch (error) {
      console.error('[Redux] Search error:', error);
      return rejectWithValue(error.message || 'Error fetching search results');
    }
  }
);

const initialState = {
  query: '',
  results: [],
  recentSearches: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    },
    addRecentSearch: (state, action) => {
      const term = action.payload.trim();
      if (term) {
        state.recentSearches = [term, ...state.recentSearches.filter(s => s !== term)].slice(0, 5); // Keep last 5
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.query = action.payload.query;
        state.results = action.payload.results;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search products';
        state.results = [];
      });
  },
});

export const { clearSearch, addRecentSearch, clearRecentSearches } = searchSlice.actions;

export default searchSlice.reducer;
