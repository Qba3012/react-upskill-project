import { useContext } from "react";
import { FC } from "react";

import { Grid, InputAdornment, TextField } from "@material-ui/core";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
import Autocomplete, { AutocompleteRenderInputParams } from "@material-ui/lab/Autocomplete";
import LocationContext from "../../store/location-context";

const LocationSearchBar: FC = () => {
  const locationCtx = useContext(LocationContext);

  return (
    <Grid item container xs={12} alignItems="center">
      <Autocomplete
        freeSolo
        id="autocomplete-search"
        style={{ minWidth: 300 }}
        options={locationCtx.options}
        getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
        onChange={locationCtx.onAddressChange}
        onInputChange={locationCtx.onInputChange}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            label="Location Search"
            size={"medium"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="start">
                  <LocationSearchingIcon fontSize="small" />
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
