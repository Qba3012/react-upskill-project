import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { fetchArticles } from "../service/wikipediaAPI";

const SET_ERROR = "setError";
const CLOSE_DIALOG = "closeDialog";
const IS_LOADING = "isLoading";
const SET_ARTICLES = "setArticles";

const INITIAL_DISPLAY_STATE = {
  showPrompt: true,
  showArticles: false,
  articlesList: [],
  isLoading: false,
  error: "",
  isError: false,
};

const displayReducer = (state, action) => {
  if (action.type === CLOSE_DIALOG) {
    return { ...state, isError: false, error: "" };
  }
  if (action.type === IS_LOADING) {
    return { ...state, isLoading: action.value };
  }
  if (action.type === SET_ERROR) {
    return { ...state, isError: true, error: action.value, isLoading: false };
  }
  if (action.type === SET_ARTICLES) {
    return {
      ...state,
      showArticles: action.value.length > 0,
      isError: false,
      error: "",
      isLoading: false,
      articlesList: action.value,
      showPrompt: action.value.length <= 0,
    };
  }
};

export const ApiContextProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  const [displayState, dispatchDisplay] = useReducer(
    displayReducer,
    INITIAL_DISPLAY_STATE
  );

  const closeDialog = () => {
    dispatchDisplay({ type: CLOSE_DIALOG });
  };

  const dataHandler = (data) => {
    dispatchDisplay({ type: SET_ARTICLES, value: data });
  };

  const fetchData = useCallback(async () => {
    if (searchInput !== "") {
      dispatchDisplay({ type: IS_LOADING, value: true });

      try {
        await fetchArticles(searchInput, dataHandler);
      } catch (error) {
        dispatchDisplay({ type: SET_ERROR, value: error.message });
      }
    } else {
      dataHandler([]);
    }
  }, [searchInput, dispatchDisplay]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchInput, fetchData]);

  return (
    <ApiContext.Provider
      value={{
        ...displayState,
        searchInput: searchInput,
        onInputChange: setSearchInput,
        onDialogClose: closeDialog,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const ApiContext = createContext({
  ...INITIAL_DISPLAY_STATE,
  searchInput: "",
  onInputChange: (input) => {},
  onDialogClose: () => {},
});

export default ApiContext;
