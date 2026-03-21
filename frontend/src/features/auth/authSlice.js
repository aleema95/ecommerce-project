import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
  user: null,
  status:"idle",
  error: null
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

    const response = await axios.post(
        "https://ecommerce-project-1bfx.onrender.com/api/users/login",
        {
            email,
            password
        }
    )

    console.log(response.data)
    
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    return response.data;
  }
);

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;