import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice";
import tableReducer from "./tableSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    header: headerReducer,
    table: tableReducer,
    app: appReducer,
  },
});

export default store;
