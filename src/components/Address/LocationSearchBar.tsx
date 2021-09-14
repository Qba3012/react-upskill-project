import { useContext } from "react";
import { FC } from "react";

import { Grid, InputAdornment, TextField } from "@material-ui/core";
import RoomIcon from "@material-ui/icons/Room";
import Autocomplete, { AutocompleteRenderInputParams } from "@material-ui/lab/Autocomplete";
import AddressContext from "../../store/address-context";

const LocationSearchBar: FC = () => {
  const { options, onAddressChange, onSearchInputChange } = useContext(AddressContext);

  return (
    <Grid item container xs={12} alignItems="center">
      <Autocomplete
        freeSolo
        id="autocomplete-search"
        style={{ minWidth: 300 }}
        options={options}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
        onChange={onAddressChange}
        onInputChange={onSearchInputChange}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            label="Address Search"
            variant="outlined"
            size={"medium"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="start">
                  <RoomIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};

export default LocationSearchBar;
