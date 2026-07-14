import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDomain: 'skincare', // 'skincare' | 'cosmetics'
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDomain: (state) => {
      state.activeDomain = state.activeDomain === 'skincare' ? 'cosmetics' : 'skincare';
    },
    setDomain: (state, action) => {
      state.activeDomain = action.payload;
    },
  },
});

export const { toggleDomain, setDomain } = appSlice.actions;
export default appSlice.reducer;
