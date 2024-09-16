import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import { ToasterType } from '../../app/constant';
import { showToaster } from '../../utils/Toaster';

const initialState = {
  products: [],
  status: 'idle',
  totalItems: 0,
  categories: [],
  brands: [],
  selectedProduct: null
};

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductByIdAsync',
  async (id, thunkAPI) => {
    // const response = await fetchProductById(id);
    // return response.data;
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      if (response.data) {
        return response.data; // Return the fetched brands data on success
      } else {
        return thunkAPI.rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle HTTP errors
      } else {
        return thunkAPI.rejectWithValue({ message: error.message }); // Handle network or other errors
      }
    }
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination, thunkAPI }) => {
    // const response = await fetchProductsByFilters(filter, sort, pagination);
    // // The value we return becomes the `fulfilled` action payload
    // return response;
    try {
      let queryString = '';
      for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length) {
          const lastCategoryValue = categoryValues[categoryValues.length - 1]
          queryString += `${key}=${lastCategoryValue}&`
        }
      }
      for (let key in sort) {
        queryString += `${key}=${sort[key]}&`
      }

      for (let key in pagination) {
        queryString += `${key}=${pagination[key]}&`
      }

      const response = await axiosInstance.get(`/products?${queryString}`);
      console.log('response', response);
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

export const fetchAllCategoriesAsync = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/categories');
      if (response.data) {
        return response.data; // Return the fetched brands data on success
      } else {
        return thunkAPI.rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle HTTP errors
      } else {
        return thunkAPI.rejectWithValue({ message: error.message }); // Handle network or other errors
      }
    }
  }
)

export const fetchAllBrandsAsync = createAsyncThunk(
  'brands/fetchAllBrands',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/brands');
      if (response.data) {
        return response.data; // Return the fetched brands data on success
      } else {
        return thunkAPI.rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle HTTP errors
      } else {
        return thunkAPI.rejectWithValue({ message: error.message }); // Handle network or other errors
      }
    }
  }
)


export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/products', product);
      if (response.data) {
        return response.data; // Return the fetched brands data on success
      } else {
        return thunkAPI.rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle HTTP errors
      } else {
        return thunkAPI.rejectWithValue({ message: error.message }); // Handle network or other errors
      }
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/products/${update.id}`, update, {
        headers: { 'content-type': 'application/json' },
      });
      if (response.data) {
        return response.data; // Return the fetched brands data on success
      } else {
        return thunkAPI.rejectWithValue(response.data); // Handle failure response
      }
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data); // Handle HTTP errors
      } else {
        return thunkAPI.rejectWithValue({ message: error.message }); // Handle network or other errors
      }
    }
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('fetchProductsByFiltersAsyncPayload', action.payload.data.doc);
        state.products = action.payload.data.doc;
        state.totalItems = action.payload.data.totalCount;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload.data;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload.data;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload.data;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload.data);
        showToaster(ToasterType.Success, action.payload.message);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('updateProductAsyncP', action.payload.data);
        const index = state.products.findIndex((product) =>
          product.id === action.payload.data.id);
        state.products[index] = action.payload.data;
        state.selectedProduct = action.payload.data;
        showToaster(ToasterType.Success, action.payload.message);

      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectedProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;

export default productSlice.reducer;
