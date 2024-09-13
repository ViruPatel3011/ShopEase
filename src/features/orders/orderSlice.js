import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, updateOrder, fetchAllOrders } from './orderAPI';
import axiosInstance from '../../helpers/axiosInstance';

const initialState = {
  status: 'idle',
  orders: [],
  currentOrder: null,
  totalOrders: 0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderDetails, thunkAPI) => {
    // const response = await createOrder(orderDetails);
    // return response.data;
    try {
      const response = await axiosInstance.post(`/orders`, orderDetails, {
        headers: { 'content-type': 'application/json' },
      });
      console.log('createOrderAsync', response);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(await response.data);
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: error.message });
      }
    }
  }
)

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (updatedOrder) => {
    const response = await updateOrder(updatedOrder);
    return response.data;
  }
)

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('createOrderAsyncPayload', action.payload);
        state.currentOrder = action.payload.data;
        state.orders.push(action.payload.data);
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order) => order.id === action.payload.id)
        state.orders[index] = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
