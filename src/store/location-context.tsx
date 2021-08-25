import { useContext } from "react";
import { ChangeEvent, createContext, FC, useCallback, useEffect, useReducer } from "react";
import Address from "../models/Address";
import GeocoderResult from "../models/GeocoderResult";
import PlaceType from "../models/PlaceType";
import { fetchLocationDetails, fetchLocations, loadLibrary } from "../service/locationsAPI";
import UIContext from "./ui-context";

type LocationContextType = {
  searchInput: string;
  options: PlaceType[];
  address: Address | null;
  onInputChange: (event: ChangeEvent<{}>, newInputValue: string) => void;
  onAddressChange: (event: ChangeEvent<{}>, newValue: any) => void;
};

type ActionType = {
  type: string;
  value?: any;
};

const SET_OPTIONS = "setOptions";
const SET_ADDRESS = "setAddress";
const SET_INPUT = "setInput";

const INITIAL_LOCATION_STATE: LocationContextType = {
  searchInput: "",
  options: [],
  address: null,
  onInputChange: () => {},
  onAddressChange: () => {},
};

const locationReducer = (state: LocationContextType, action: ActionType): LocationContextType => {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        options: action.value,
      };
    case SET_INPUT:
      return {
        ...state,
        searchInput: action.value,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.value,
      };
    default:
      return INITIAL_LOCATION_STATE;
  }
};

export const LocationContextProvider: FC = ({ children }) => {
  const uiContext = useContext(UIContext);
  const [locationState, dispatch] = useReducer(locationReducer, INITIAL_LOCATION_STATE);

  const setSearchInput = (event: ChangeEvent<{}>, newInputValue: string) => {
    dispatch({ type: SET_INPUT, value: newInputValue });
  };

  const setAddress = (event: ChangeEvent<{}>, newValue: PlaceType) => {
    if (newValue && newValue.place_id) {
      try {
        fetchLocationDetails(newValue.place_id, (results: GeocoderResult[]) => {
          dispatch({ type: SET_ADDRESS, value: new Address(results[0]) });
        });
      } catch (error) {
        uiContext.setError(error.message);
      }
    } else {
      dispatch({ type: SET_ADDRESS, value: null });
    }
  };

  const fetchData = useCallback(async () => {
    if (locationState.searchInput === "") {
      dispatch({
        type: SET_OPTIONS,
        value: [],
      });
      return;
    }

    try {
      fetchLocations(locationState.searchInput, (results?: PlaceType[]) => {
        let newOptions = [] as PlaceType[];
        if (results) {
          newOptions = [...results];
        }
        dispatch({ type: SET_OPTIONS, value: newOptions });
      });
    } catch (error) {
      uiContext.setError(error.message);
    }
  }, [locationState.searchInput, dispatch]);

  useEffect(() => {
    loadLibrary();
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchData();
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [locationState.searchInput, fetchData]);

  const contextValue: LocationContextType = {
    ...locationState,
    onInputChange: setSearchInput,
    onAddressChange: setAddress,
  };

  return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};

const LocationContext = createContext<LocationContextType>({
  ...INITIAL_LOCATION_STATE,
});

export default LocationContext;
