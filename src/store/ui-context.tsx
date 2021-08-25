import { createContext, FC, useReducer } from "react";

type UIStateType = {
  isLoading: boolean;
  error: string;
  isError: boolean;
  closeDialog: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
};

type ActionType = {
  type: string;
  value?: any;
};

const SET_ERROR = "setError";
const CLOSE_DIALOG = "closeDialog";
const IS_LOADING = "isLoading";

const INITIAL_UI_STATE: UIStateType = {
  isLoading: false,
  error: "",
  isError: false,
  closeDialog: () => {},
  setIsLoading: () => {},
  setError: () => {},
};

const uiReducer = (state: UIStateType, action: ActionType): UIStateType => {
  switch (action.type) {
    case CLOSE_DIALOG:
      return { ...state, isError: false, error: "" };
    case IS_LOADING:
      return { ...state, isLoading: action.value };
    case SET_ERROR:
      return { ...state, isError: true, error: action.value, isLoading: false };
    default:
      return INITIAL_UI_STATE;
  }
};

export const UIContextProvider: FC = ({ children }) => {
  const [uiState, dispatchUI] = useReducer(uiReducer, INITIAL_UI_STATE);

  const closeDialog = () => {
    dispatchUI({ type: CLOSE_DIALOG });
  };

  const setIsLoading = (isLoading: boolean) => {
    dispatchUI({ type: IS_LOADING, value: isLoading });
  };

  const setError = (error: string) => {
    dispatchUI({ type: SET_ERROR, value: error });
  };

  const contextValue: UIStateType = {
    ...uiState,
    closeDialog: closeDialog,
    setIsLoading: setIsLoading,
    setError: setError,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

const UIContext = createContext<UIStateType>({
  ...INITIAL_UI_STATE,
});

export default UIContext;
