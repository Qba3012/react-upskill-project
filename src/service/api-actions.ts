import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import Article from "../models/Article";
import { articlesActions } from "../store/articles-slice";
import { uiActions } from "../store/ui-slice";

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
export const ARTICLE_URL = "https://en.wikipedia.org/?curid=";

export const fetchArticles = (searchPhrase: string) => {
  return async (dispatch: Dispatch<any>) => {

    const sendRequest = async () => {
      const response = await axios.get(
        `${WIKIPEDIA_URL}${searchPhrase.trim().toLowerCase()}`
      );
      return response;
    };

    const transformResponse = (response: AxiosResponse) => {
      return response.data.query.search.map((articleData: Article) => {
        return {
          pageid: articleData.pageid,
          title: articleData.title,
          snippet: articleData.snippet,
        };
      });
    };

    dispatch(uiActions.setIsLoading({ isLoading: true }));

    try {
      const response = await sendRequest();
      const transformedResponse = transformResponse(response);
      dispatch(uiActions.setIsLoading(false));
      dispatch(articlesActions.setArticles({ articles: transformedResponse }));
    } catch (error) {
      dispatch(uiActions.setError({error: error.message,}));
    }
  };
};
