import { createSlice } from "@reduxjs/toolkit";
import { initialheader } from "./initialState";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    realvalue: initialheader,
    tempvalue: initialheader,
    defaultvalue: initialheader,
  },
  reducers: {
    updateTemp: (state, action) => {
      state.tempvalue = action.payload;
    },
    updateReal: (state, action) => {
      state.realvalue = action.payload;
    },
  },
});

export const { updateTemp, updateReal } = headerSlice.actions;
export default headerSlice.reducer;
