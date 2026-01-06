import { createSlice, createAsyncThunk } from "@/reduxjs/toolkit";

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
