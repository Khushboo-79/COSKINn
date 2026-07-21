import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { catalogService } from '../../services/catalogService';

export const fetchHomeData = createAsyncThunk(
  'catalog/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching home data from backend API...');
      const response = await catalogService.getHome();
      console.log('Home data fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching home data:', error);
      return rejectWithValue(error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'catalog/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching categories from backend API...');
      const response = await catalogService.getCategories();
      console.log('Categories fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  homeData: null,
  categories: [],
  loading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchHomeData
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch home data';
      })
      // fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data || action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      });
  },
});

export default catalogSlice.reducer;
