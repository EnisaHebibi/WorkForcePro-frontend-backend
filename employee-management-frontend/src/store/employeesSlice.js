import { createSlice, createAsyncThunk } from "@/reduxjs/toolkit";
import reducer from "./authSlice";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/employees/all-users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;
