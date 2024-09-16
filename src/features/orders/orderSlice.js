import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    try {
      const response = await axiosInstance.post(`/orders`, orderDetails, {
        headers: { 'content-type': 'application/json' },
      });
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
  async (updatedOrder,thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/orders/${updatedOrder.id}`, updatedOrder, {
        headers: { 'content-type': 'application/json' },
      });
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

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({ sort, pagination,thunkAPI }) => {
    try {
      let queryString = '';

      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`;
      }
      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`;
      }

      const response = await axiosInstance.get(`/orders?${queryString}`)
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
        state.currentOrder = action.payload.data;
        state.orders.push(action.payload.data);
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex((order) => order.id === action.payload.data.id)
        state.orders[index] = action.payload.data;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.data.doc;
        state.totalOrders = action.payload.data.totalCount;
      })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;

export default orderSlice.reducer;
