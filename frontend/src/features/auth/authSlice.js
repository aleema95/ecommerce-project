import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

    extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      });
  }
});

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async ({ email, password }) => {
    try {

      const response = await axios.post(
        "https://ecommerce-project-1bfx.onrender.com/api/users/login",
        {
          email,
          password
        }
      );

      return response.data;

    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);

export const {} = authSlice.actions;

export default authSlice.reducer;