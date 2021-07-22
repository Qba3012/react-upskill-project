import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import Article from "../models/Article";
import { fetchArticles } from "../service/wikipediaAPI";

type DisplayStateType = {
  showPrompt: boolean;
  showArticles: boolean;
  articlesList: Article[];
  isLoading: boolean;
  error: string;
  isError: boolean;
};

type ApiContextType = DisplayStateType & {
  searchInput: string;
  onInputChange: (input: string) => void;
  onDialogClose: () => void;
};

type ActionType = {
  type: string;
  value?: any;
};

const SET_ERROR = "setError";
const CLOSE_DIALOG = "closeDialog";
const IS_LOADING = "isLoading";
const SET_ARTICLES = "setArticles";

const INITIAL_DISPLAY_STATE: DisplayStateType = {
  showPrompt: true,
  showArticles: false,
  articlesList: [],
  isLoading: false,
  error: "",
  isError: false,
};

const displayReducer = ( state: DisplayStateType, action: ActionType ): DisplayStateType => {
  switch(action.type) {
    case CLOSE_DIALOG: return { ...state, isError: false, error: "" };
    case IS_LOADING: return { ...state, isLoading: action.value };
    case SET_ERROR: return { ...state, isError: true, error: action.value, isLoading: false };
    case SET_ARTICLES: return {
      ...state,
      showArticles: action.value.length > 0,
      isError: false,
      error: "",
      isLoading: false,
      articlesList: action.value,
      showPrompt: action.value.length <= 0,
    };
    default: return INITIAL_DISPLAY_STATE;
  }
};

export const ApiContextProvider: FC = ({ children }) => {
  const [searchInput, setSearchInput] = useState("");

  const [displayState, dispatchDisplay] = useReducer(
    displayReducer,
    INITIAL_DISPLAY_STATE
  );

  const closeDialog = () => {
    dispatchDisplay({ type: CLOSE_DIALOG });
  };

  const dataHandler = (data: Article[]) => {
    dispatchDisplay({ type: SET_ARTICLES, value: data });
  };

  const fetchData = useCallback(async () => {
    if (searchInput !== "") {
      dispatchDisplay({ type: IS_LOADING, value: true });

      try {
        const data = await fetchArticles(searchInput);
        dataHandler(data);
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

  const contextValue: ApiContextType = {
    ...displayState,
    searchInput: searchInput,
    onInputChange: setSearchInput,
    onDialogClose: closeDialog,
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

const ApiContext = createContext<ApiContextType>({
  ...INITIAL_DISPLAY_STATE,
  searchInput: "",
  onInputChange: (input: string) => {},
  onDialogClose: () => {},
});

export default ApiContext;