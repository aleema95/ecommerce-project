import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

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
  }
});

export const fetchProducts = createAsyncThunk(
  "products/fetchUser",
  async () => {
    try {

      const response = await axios.get("https://ecommerce-project-1bfx.onrender.com/api/products/");

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
        `https://ecommerce-project-1bfx.onrender.com/api/products/${id}`
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

export const {} = productsSlice.actions;

export default productsSlice.reducer;