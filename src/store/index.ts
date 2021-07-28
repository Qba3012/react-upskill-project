import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./articles-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    articles: articlesSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
