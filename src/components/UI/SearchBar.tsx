import { ChangeEvent, FC } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

type Props = {
  label: string;
  value: string;
  isLoading: boolean;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar: FC<Props> = ({
  label,
  value,
  inputChangeHandler,
  isLoading,
}) => {
  return (
    <Grid item container xs={12} alignItems="center">
      <TextField
        label={label}
        value={value}
        onChange={inputChangeHandler}
        size={"medium"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      {isLoading && <CircularProgress size={30} />}
    </Grid>
  );
};

export default SearchBar;
