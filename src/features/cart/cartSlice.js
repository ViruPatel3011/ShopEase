import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, updateCart } from './cartAPI';
import axiosInstance from '../../helpers/axiosInstance';
import { ToasterType } from '../../app/constant';
import { showToaster } from '../../utils/Toaster';

const initialState = {
  value: 0,
  status: 'idle',
  items: []
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
)

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId, thunkAPI) => {
    // const response = await fetchItemsByUserId(userId);
    // return response.data;
    try {
      const response = await axiosInstance.get(`/cart?user=${userId}`);
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

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (updateData) => {
    const response = await updateCart(updateData);
    return response.data;
  }
)

export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (cartId, thunkAPI) => {
    // const response = await deleteCart(cartId);
    // return response.data;
    try {
      const response = await axiosInstance.delete(`/cart/${cartId}`);
      console.log('deleteCartAsync', response);
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

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId, thunkAPI) => {
    try {
      // Fetch items by userId
      const fetchResponse = await thunkAPI.dispatch(fetchItemsByUserIdAsync(userId));
      console.log('fetchResponse' , fetchResponse);
      // Check if the fetch was successful
      if (fetchResponse.error) {
        return thunkAPI.rejectWithValue(fetchResponse.error);
      }

      const items = fetchResponse.payload.data;
      console.log('items' , items);
      // Delete each item in the cart
      for (let item of items) {
        const deleteResponse = await thunkAPI.dispatch(deleteCartAsync(item.id));

        // Check if the deletion was successful
        if (deleteResponse.error) {
          return thunkAPI.rejectWithValue(deleteResponse.error);
        }
      }

      return { status: "Success", userId };

    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload.data);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.data;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const cartIndex = state.items.findIndex(item => item.id === action.payload.id);
        state.items[cartIndex] = action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('deleteCartAsyncPayload', action.payload);
        const cartIndex = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(cartIndex, 1);
        showToaster(ToasterType.Success, action.payload.message);

      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      })

  },
});

export const { increment } = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
