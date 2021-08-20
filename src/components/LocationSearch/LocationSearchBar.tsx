import { ChangeEvent, FC } from "react";
import SearchBar from "../UI/SearchBar";

const LocationSearchBar: FC = () => {
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {};

  return (
    <SearchBar
      inputChangeHandler={inputChangeHandler}
      label="Location search"
      isLoading={false}
      value=""
    />
  );
};

export default LocationSearchBar;
