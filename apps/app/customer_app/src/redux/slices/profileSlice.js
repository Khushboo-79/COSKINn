import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileService } from '../../services/profileService';
import { walletService } from '../../services/walletService';
import { membershipService } from '../../services/membershipService';

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to update profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await profileService.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to fetch wallet
export const fetchWallet = createAsyncThunk(
  'profile/fetchWallet',
  async (_, { rejectWithValue }) => {
    try {
      const response = await walletService.getWalletBalance();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to fetch reward points
export const fetchRewardPoints = createAsyncThunk(
  'profile/fetchRewardPoints',
  async (_, { rejectWithValue }) => {
    try {
      const response = await walletService.getRewardPoints();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMembershipTier = createAsyncThunk(
  'profile/fetchMembershipTier',
  async (_, { rejectWithValue }) => {
    try {
      const response = await membershipService.getMyTier();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  data: null, // Holds profile data like { firstName, lastName, email, phone, etc. }
  walletBalance: 0,
  rewardPoints: 0,
  membershipTier: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile cases
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // assuming API returns the profile object directly
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        console.log('updateProfile.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('updateProfile.fulfilled - Profile updated successfully:', action.payload);
        state.loading = false;
        // Optionally update the state with the response if it returns the updated profile
        if (action.payload && typeof action.payload === 'object') {
          state.data = { ...state.data, ...action.payload };
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log('updateProfile.rejected - Error updating profile:', action.payload);
        state.loading = false;
        state.error = action.payload || 'Failed to update profile';
      })
      // Fetch wallet
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.walletBalance = action.payload?.balance || action.payload?.data?.balance || 0;
      })
      // Fetch reward points
      .addCase(fetchRewardPoints.fulfilled, (state, action) => {
        state.rewardPoints = action.payload?.points || action.payload?.data?.points || 0;
      })
      // Fetch membership tier
      .addCase(fetchMembershipTier.fulfilled, (state, action) => {
        state.membershipTier = action.payload?.data || action.payload || null;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
