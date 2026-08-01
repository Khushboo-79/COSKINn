import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addressService } from '../../services/addressService';
import { locationService } from '../../services/locationService';

// Async thunk to fetch live location based on IP
export const fetchLiveLocation = createAsyncThunk(
  'address/fetchLiveLocation',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching live location from backend API...');
      const response = await locationService.getIpLocation();
      console.log('Live location fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching live location:', error);
      return rejectWithValue(error.message || 'Error fetching live location');
    }
  }
);

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

// Async thunk to add address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async (addressData, { rejectWithValue, dispatch }) => {
    try {
      const response = await addressService.addAddress(addressData);
      dispatch(fetchAddresses()); // Refresh list
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to update address
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await addressService.updateAddress(id, data);
      dispatch(fetchAddresses());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to delete address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await addressService.deleteAddress(id);
      dispatch(fetchAddresses());
      return response;
    } catch (error) {
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
      })
      .addCase(fetchLiveLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLiveLocation.fulfilled, (state, action) => {
        state.loading = false;
        const loc = action.payload;
        if (!loc || loc.error) {
           state.error = loc?.error || 'Failed to resolve location';
           return;
        }
        state.selectedAddress = {
          id: 'live_loc_' + Date.now(),
          fullName: 'Current Location',
          addressLine1: loc.city || loc.region || loc.country || 'Unknown Area',
          city: loc.city || '',
          state: loc.region || '',
          country: loc.country || '',
          pincode: 'LIVE',
          isDefault: true
        };
      })
      .addCase(fetchLiveLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch live location';
      });
  },
});

export const { setSelectedAddress, clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;
