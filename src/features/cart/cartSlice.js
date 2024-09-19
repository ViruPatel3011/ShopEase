import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  async (item, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/cart`, item);
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

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/cart`);
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
  async (updateData,thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/cart/${updateData.id}`, updateData);
      if (response.data.success) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
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

export const deleteCartAsync = createAsyncThunk(
  'cart/deleteCart',
  async (cartId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/cart/${cartId}`);
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
  async (_, thunkAPI) => {
    try {
      // Fetch items by userId
      const fetchResponse = await thunkAPI.dispatch(fetchItemsByUserIdAsync());
      
      // Check if the fetch was successful
      if (fetchResponse.error) {
        return thunkAPI.rejectWithValue(fetchResponse.error);
      }

      const items = fetchResponse.payload.data;

      // Delete each item in the cart
      for (let item of items) {
        const deleteResponse = await thunkAPI.dispatch(deleteCartAsync(item.id));

        // Check if the deletion was successful
        if (deleteResponse.error) {
          return thunkAPI.rejectWithValue(deleteResponse.error);
        }
      }

      return { status: "Success"};

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
        const cartIndex = state.items.findIndex(item => item.id === action.payload.data.id);
        state.items[cartIndex] = action.payload.data;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const cartIndex = state.items.findIndex(item => item.id === action.payload.data.id)
        state.items.splice(cartIndex, 1);
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
