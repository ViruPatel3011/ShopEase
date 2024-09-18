import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';

const initialState = {
  status: 'idle',
  userInfo: null, // this info will be used in case of detailed user info, while auth will 
  // only be used for loggedInUser id etc checks,
  userOrders: [],

}

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/orders/own/`);
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

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (_, thunkAPI) => {
    // const response = await fetchLoggedInUser(userId);
    // return response.data;
    try {
      const response = await axiosInstance.get(`/users/own`);
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
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (updateInfo, thunkAPI) => {

    try {
      const response = await axiosInstance.patch(`/users/${updateInfo.id}`, updateInfo, {
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
);

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
        state.userOrders = action.payload.data;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload.data;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload.data;
      })
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserOrdersStatus = (state) => state.user.status;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
