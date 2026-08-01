import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { catalogService } from '../../services/catalogService';
import { contentService } from '../../services/contentService';

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
  async (platform, { rejectWithValue }) => {
    try {
      console.log(`Fetching categories for ${platform || 'ALL'}...`);
      const response = await catalogService.getCategories(platform);
      console.log(`Categories fetched successfully for ${platform}:`, response);
      return { platform, data: response };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return rejectWithValue(error);
    }
  }
);

export const fetchSkinTypes = createAsyncThunk(
  'catalog/fetchSkinTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await catalogService.getSkinTypes();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSkinConcerns = createAsyncThunk(
  'catalog/fetchSkinConcerns',
  async (_, { rejectWithValue }) => {
    try {
      const response = await catalogService.getSkinConcerns();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  'catalog/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await catalogService.getIngredients();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSkincareProducts = createAsyncThunk(
  'catalog/fetchSkincareProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await catalogService.getProducts({ category: 'skincare', ...filters });
      return { data: response, filters };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSkincareGuides = createAsyncThunk(
  'catalog/fetchSkincareGuides',
  async (_, { rejectWithValue }) => {
    try {
      const response = await contentService.getArticles('TIP');
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  'catalog/fetchNewArrivals',
  async (platform, { rejectWithValue }) => {
    try {
      const response = await catalogService.getNewArrivals(platform);
      return { platform, data: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  homeData: null,
  skincareCategories: [],
  cosmeticsCategories: [],
  skinTypes: [],
  skinConcerns: [],
  ingredients: [],
  skincareProducts: [],
  skincareGuides: [],
  skincareNewArrivals: [],
  cosmeticsNewArrivals: [],
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
        const items = action.payload?.data?.data || action.payload?.data?.value || action.payload?.data || [];
        if (action.payload.platform === 'COSMETICS') {
          state.cosmeticsCategories = items;
        } else if (action.payload.platform === 'SKINCARE') {
          state.skincareCategories = items;
        }
      })
      .addCase(fetchSkinTypes.fulfilled, (state, action) => {
        state.skinTypes = action.payload?.data || action.payload || [];
      })
      .addCase(fetchSkinConcerns.fulfilled, (state, action) => {
        state.skinConcerns = action.payload?.data || action.payload || [];
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload?.data || action.payload || [];
      })
      .addCase(fetchSkincareProducts.fulfilled, (state, action) => {
        state.skincareProducts = action.payload?.data?.items || action.payload?.items || action.payload?.data?.data || [];
      })
      .addCase(fetchSkincareGuides.fulfilled, (state, action) => {
        state.skincareGuides = action.payload?.data || action.payload || [];
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        const items = action.payload?.data?.items || action.payload?.data?.data || action.payload?.data || [];
        if (action.payload.platform === 'COSMETICS') {
          state.cosmeticsNewArrivals = items;
        } else {
          state.skincareNewArrivals = items;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch categories';
      });
  },
});

export default catalogSlice.reducer;
