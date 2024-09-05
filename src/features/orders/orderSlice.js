import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder} from './orderAPI';

const initialState = {
  status: 'idle',
  orders: []
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (orderDetails) => {
    const response = await createOrder(orderDetails);
    return response.data;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
      })
  },
});

export const { increment } = orderSlice.actions;


export default orderSlice.reducer;
