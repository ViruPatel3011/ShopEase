import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  status: 'idle',
  userOrders: [],
}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
