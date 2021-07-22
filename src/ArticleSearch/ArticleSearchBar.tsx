import React, { ChangeEvent, FC, useContext } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import ApiContext from "../store/api-context";

const ArticleSearchBar: FC = () => {
  const apiCtx = useContext(ApiContext);

  const inputChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    apiCtx.onInputChange(event.target.value);
  };

  return (
    <Grid item container xs={12} alignItems="center">
      <TextField
        label="Search Article"
        value={apiCtx.searchInput}
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
      {apiCtx.isLoading && <CircularProgress size={30} />}
    </Grid>
  );
}

export default ArticleSearchBar;