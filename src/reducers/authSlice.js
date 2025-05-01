import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = "http://localhost:3001"; 

// Async thunks for authentication
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log(response);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    
      
      return response.data;
    } catch (error) {
        if(error.status===401){
           toast.error('Invalid email or password')
        }
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if(response.data.statusCode===200){
        toast.success('Registration successful')
      }
   
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return rejectWithValue("No authentication token found");
    }
    
    try {
      // Set auth header for this request
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update stored user data with latest profile
      localStorage.setItem("user", JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      // If unauthorized (401), clear storage
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);



// Initialize auth header from localStorage on app load
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  registrationSuccess: false
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
    logout: (state) => {
      // Clear localStorage
      localStorage.removeItem("token");
      
      // Reset auth state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Clear auth header
      delete axios.defaults.headers.common["Authorization"];
      
      // Show success message
      toast.success("Logged out successfully");
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        
        state.error = action.payload || { message: "Login failed" };
        state.isAuthenticated = false;
      })
      
      // Registration cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationSuccess = true;
        
        // If registration returns user and token (auto-login)
        if (action.payload.token) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Registration failed" };
        state.registrationSuccess = false;
      })
      
      // Get profile cases
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Failed to fetch profile" };
        
        // If token was invalid, clear auth state
        if (action.payload?.status === 401) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      })
      
     
  }
});

export const { clearError, resetRegistrationSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
