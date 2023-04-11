import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTableData } from "./fetchData";

//Action
export const fetchTable = createAsyncThunk(
  "fetchTable",
  async ([start, end]) => {
    const response = await getTableData([start, end]);
    return response;
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    isTable: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTable.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTable.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload.error) {
        state.isError = true;
        state.isLoading = false;
        return;
      }
      state.isLoading = false;
      state.isTable = true;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTable.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default tableSlice.reducer;
