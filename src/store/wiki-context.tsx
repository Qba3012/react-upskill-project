import { createContext, FC, useCallback, useContext, useEffect, useReducer } from "react";
import Article from "../models/Article";
import { fetchArticles } from "../service/wikipediaAPI";
import UIContext from "./ui-context";

type WikiContextType = {
  searchInput: string;
  showPrompt: boolean;
  showArticles: boolean;
  articlesList: Article[];
  onInputChange: (input: string) => void;
};

type ActionType = {
  type: string;
  value?: any;
};

const SET_ARTICLES = "setArticles";
const SET_INPUT = "setInput";

const INITIAL_WIKI_STATE: WikiContextType = {
  searchInput: "",
  showPrompt: true,
  showArticles: false,
  articlesList: [],
  onInputChange: () => {},
};

const wikiReducer = (state: WikiContextType, action: ActionType): WikiContextType => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        showArticles: action.value.length > 0,
        articlesList: action.value,
        showPrompt: action.value.length <= 0,
      };
    case SET_INPUT:
      return {
        ...state,
        searchInput: action.value,
      };
    default:
      return INITIAL_WIKI_STATE;
  }
};

export const WikiContextProvider: FC = ({ children }) => {
  const uiContext = useContext(UIContext);

  const [wikiState, dispatchDisplay] = useReducer(wikiReducer, INITIAL_WIKI_STATE);

  const setSearchInput = (value: string) => {
    dispatchDisplay({ type: SET_INPUT, value: value });
  };

  const fetchData = useCallback(async () => {
    if (wikiState.searchInput !== "") {
      uiContext.setIsLoading(true);

      try {
        const data = await fetchArticles(wikiState.searchInput);
        uiContext.setIsLoading(false);
        dispatchDisplay({ type: SET_ARTICLES, value: data });
      } catch (error) {
        uiContext.setError(error.message);
      }
    } else {
      uiContext.setIsLoading(false);
      dispatchDisplay({ type: SET_ARTICLES, value: [] });
    }
  }, [wikiState.searchInput, dispatchDisplay]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [wikiState.searchInput, fetchData]);

  const contextValue: WikiContextType = {
    ...wikiState,
    onInputChange: setSearchInput,
  };

  return <WikiContext.Provider value={contextValue}>{children}</WikiContext.Provider>;
};

const WikiContext = createContext<WikiContextType>({
  ...INITIAL_WIKI_STATE,
});

export default WikiContext;
