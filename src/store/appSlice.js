import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAppData } from "./fetchData";

//Action
export const fetchApps = createAsyncThunk("fetchApps", async () => {
  const response = await getAppData();
  return response;
});

export const AppSlice = createSlice({
  name: "table",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApps.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchApps.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchApps.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default AppSlice.reducer;
