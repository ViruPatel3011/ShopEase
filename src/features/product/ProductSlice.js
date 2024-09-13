import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilters, createProduct, updateProduct } from './ProductAPI';
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
      console.log('fetchProductByIdAsync', response);
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
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/categories');
      console.log('fetchAllCategoriesAsync', response);
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
      console.log('fetchAllBrandsAsync', response);
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
    // const response = await createProduct(product);
    // return response.data;
    try {
      const response = await axiosInstance.post('/products', product);
      console.log('createProductAsync', response);
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
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
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
        state.products = action.payload.data;
        state.totalItems = action.payload.items;
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
        console.log("fetchProductByIdAsyncPayload:", action.payload.data)
        state.selectedProduct = action.payload.data;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log('createProductAsyncPayload', action.payload.data);
        state.products.push(action.payload.data);
        showToaster(ToasterType.Success, action.payload.message);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((product) =>
          product.id === action.payload.id);
        state.products[index] = action.payload;
        state.selectedProduct = action.payload;

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
