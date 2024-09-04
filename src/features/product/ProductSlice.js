import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters, fetchCategories, fetchBrands } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems: 0,
  categories:[],
  brands:[]
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllCategoriesAsync=createAsyncThunk(
  'category/fetchAllCategories',
  async()=>{
    const response = await fetchCategories();
    return response.data;
  }
)

export const fetchAllBrandsAsync = createAsyncThunk(
  'brands/fetchAllBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log("Action:", action.payload)
        state.products = action.payload;
        // console.log("state:", state.products)
      })
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
      state.categories = action.payload;
    })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
      state.status = 'loading';
    })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.brands = action.payload;
    });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;


export default productSlice.reducer;
