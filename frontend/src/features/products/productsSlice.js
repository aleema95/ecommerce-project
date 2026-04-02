import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  products: [],
  product: null,
  status: "idle"
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

    extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      })

       // SINGLE PRODUCT
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // add product instantly to store
        state.products.push(action.payload);
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const fetchProducts = createAsyncThunk(
  "products/fetchUser",
  async () => {
    try {

      const response = await axios.get(`${API_URL}/products`);

      return response.data;

    } catch (error) {
      throw new Error(error.response?.data?.message || "Couldn't fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/${id}`
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData) => {

    const response = await axios.post(
      `${API_URL}/products`,
      formData
    );

    return response.data;
  }
);


export const {} = productsSlice.actions;

export default productsSlice.reducer;