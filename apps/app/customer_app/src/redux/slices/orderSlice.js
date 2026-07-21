import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'order/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderTracking = createAsyncThunk(
  'order/fetchOrderTracking',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderService.trackOrder(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cancelOrderAction = createAsyncThunk(
  'order/cancelOrder',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await orderService.cancelOrder(orderId, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const returnOrderAction = createAsyncThunk(
  'order/returnOrder',
  async ({ orderId, returnData }, { rejectWithValue }) => {
    try {
      const response = await orderService.returnOrder(orderId, returnData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload?.data || action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create order';
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = Array.isArray(action.payload) ? action.payload : (action.payload?.data || []);
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });
  }
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
