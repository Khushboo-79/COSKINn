import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addressService } from '../../services/addressService';

// Async thunk to fetch addresses
export const fetchAddresses = createAsyncThunk(
  'address/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching addresses from backend API...');
      const response = await addressService.getAddresses();
      console.log('Addresses fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  items: [],
  selectedAddress: null, // Stores the currently selected delivery address object
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearAddresses: (state) => {
      state.items = [];
      state.selectedAddress = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        
        let fetchedAddresses = [];
        if (Array.isArray(action.payload)) {
            fetchedAddresses = action.payload;
        } else if (action.payload?.data && Array.isArray(action.payload.data)) {
            fetchedAddresses = action.payload.data;
        } else if (action.payload?.items && Array.isArray(action.payload.items)) {
            fetchedAddresses = action.payload.items;
        }

        state.items = fetchedAddresses;

        // Auto-select the first address if none is selected
        if (fetchedAddresses.length > 0 && !state.selectedAddress) {
           // check if any is marked as default
           const defaultAddress = fetchedAddresses.find(a => a.isDefault);
           state.selectedAddress = defaultAddress || fetchedAddresses[0];
        }
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch addresses';
      });
  },
});

export const { setSelectedAddress, clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;
