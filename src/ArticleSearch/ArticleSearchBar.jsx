import React from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

function ArticleSearchBar({ onSearchTitleChange, searchText, isLoading }) {
  const inputChangeHandler = (event) => {
    onSearchTitleChange(event.target.value);
  };

  return (
    <Grid item container xs={12} alignItems="center">
      <TextField
        label="Search Article"
        value={searchText}
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
}

ArticleSearchBar.propTypes = {};

export default ArticleSearchBar;
