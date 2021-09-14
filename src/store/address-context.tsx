import { useContext } from "react";
import { ChangeEvent, createContext, FC, useCallback, useEffect, useReducer } from "react";
import Address from "../models/Address";
import GeocoderResult from "../models/GeocoderResult";
import PlaceType from "../models/PlaceType";
import { fetchAddresses, saveAddress } from "../service/addressAPI";
import { fetchLocationDetails, fetchLocations, loadLibrary } from "../service/locationsAPI";
import UIContext from "./ui-context";

type AddressContextType = {
  searchInput: string;
  options: PlaceType[];
  address: Address | null;
  addresses: Address[];
  isFormValidated: boolean;
  onFirstNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearchInputChange: (event: ChangeEvent<{}>, newInputValue: string) => void;
  onAddressChange: (event: ChangeEvent<{}>, newValue: any) => void;
  onSubmit: () => void;
};

type ActionType = {
  type: string;
  value?: any;
};

const SET_OPTIONS = "setOptions";
const SET_ADDRESS = "setAddress";
const SET_ADDRESSES_AND_RESET_FORM = "setAddressesAndResetForm";
const SET_ADDRESS_SEARCH_INPUT = "setAddressSearchInput";
const SET_VALIDATION = "setVadlidation";

const INITIAL_ADDRESS_STATE: AddressContextType = {
  searchInput: "",
  options: [],
  address: null,
  addresses: [],
  isFormValidated: false,
  onFirstNameChange: () => {},
  onLastNameChange: () => {},
  onSearchInputChange: () => {},
  onAddressChange: () => {},
  onSubmit: () => {},
};

const addressReducer = (state: AddressContextType, action: ActionType): AddressContextType => {
  switch (action.type) {
    case SET_OPTIONS:
      return {
        ...state,
        options: action.value,
      };
    case SET_ADDRESS_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.value,
      };
    case SET_ADDRESS:
      return {
        ...state,
        address: action.value,
      };
    case SET_VALIDATION:
      return {
        ...state,
        isFormValidated: action.value,
      };
    case SET_ADDRESSES_AND_RESET_FORM:
      return {
        ...state,
        addresses: action.value,
        address: null,
        searchInput: "",
        options: [],
        isFormValidated: false,
      };
    default:
      return INITIAL_ADDRESS_STATE;
  }
};

export const LocationContextProvider: FC = ({ children }) => {
  const uiContext = useContext(UIContext);
  const [addressState, dispatch] = useReducer(addressReducer, INITIAL_ADDRESS_STATE);

  const setSearchInput = (event: ChangeEvent<{}>, newInputValue: string) => {
    dispatch({ type: SET_ADDRESS_SEARCH_INPUT, value: newInputValue });
  };

  const setFirstName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_ADDRESS, value: { ...addressState.address, firstName: event.target.value } });
  };

  const setLastName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_ADDRESS, value: { ...addressState.address, lastName: event.target.value } });
  };

  const setAddress = (event: ChangeEvent<{}>, newValue: PlaceType) => {
    if (newValue && newValue.place_id) {
      try {
        fetchLocationDetails(newValue.place_id, (results: GeocoderResult[]) => {
          dispatch({ type: SET_ADDRESS, value: Address.fromGeocoderResult(results[0]) });
        });
      } catch (error: any) {
        uiContext.setError(error.message);
      }
    } else {
      dispatch({ type: SET_ADDRESS, value: null });
      dispatch({ type: SET_VALIDATION, value: false });
    }
  };

  const submitAndValidateForm = async () => {
    if (addressState.address?.firstName === "" || addressState.address?.lastName === "") {
      dispatch({ type: SET_VALIDATION, value: true });
      return;
    }

    if (addressState.address) {
      const newAddress = await saveAddress(addressState.address);
      const newAddresses = [...addressState.addresses];
      newAddresses.unshift(newAddress);
      dispatch({ type: SET_ADDRESSES_AND_RESET_FORM, value: newAddresses });
    }
  };

  const fetchAddressesData = useCallback(async () => {
    try {
      const addresses = await fetchAddresses();
      dispatch({ type: SET_ADDRESSES_AND_RESET_FORM, value: addresses });
    } catch (error: any) {
      uiContext.setError(error.message);
    }
  }, []);

  const fetchLocationData = useCallback(async () => {
    if (addressState.searchInput === "") {
      dispatch({
        type: SET_OPTIONS,
        value: [],
      });
      return;
    }

    try {
      fetchLocations(addressState.searchInput, (results?: PlaceType[]) => {
        let newOptions = [] as PlaceType[];
        if (results) {
          newOptions = [...results];
        }
        dispatch({ type: SET_OPTIONS, value: newOptions });
      });
    } catch (error: any) {
      uiContext.setError(error.message);
    }
  }, [addressState.searchInput, dispatch]);

  useEffect(() => {
    loadLibrary();
    fetchAddressesData();
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchLocationData();
    }, 200);

    return () => {
      clearTimeout(identifier);
    };
  }, [addressState.searchInput, fetchLocationData]);

  const contextValue: AddressContextType = {
    ...addressState,
    onFirstNameChange: setFirstName,
    onLastNameChange: setLastName,
    onSearchInputChange: setSearchInput,
    onAddressChange: setAddress,
    onSubmit: submitAndValidateForm,
  };

  return <AddressContext.Provider value={contextValue}>{children}</AddressContext.Provider>;
};

const AddressContext = createContext<AddressContextType>({
  ...INITIAL_ADDRESS_STATE,
});

export default AddressContext;
