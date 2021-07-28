import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        articles: []
    },
    reducers: {
        setArticles(state, action) {
            state.articles = action.payload.articles;
        }
    }
})

export const articlesActions = articlesSlice.actions;

export default articlesSlice;