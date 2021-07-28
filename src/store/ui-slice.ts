import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    error: "",
    isLoading: false,
  },
  reducers: {
    closeDialog(state) {
      state.error = "";
    },
    setIsLoading(state, action) {
        state.isLoading = action.payload.isLoading;
    },
    setError(state, action) {
        state.isLoading = false;
        state.error = action.payload.error;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
