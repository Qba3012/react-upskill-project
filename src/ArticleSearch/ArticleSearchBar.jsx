import React from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function ArticleSearchBar({ onSearchTitleChange, onBlurHandler, searchText }) {
  const inputChangeHandler = (event) => {
    onSearchTitleChange(event.target.value);
  };

  return (
    <Grid item xs={12}>
      <TextField
        label="Search Article"
        value={searchText}
        onChange={inputChangeHandler}
        onBlur={onBlurHandler}
        size={"medium"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

ArticleSearchBar.propTypes = {};

export default ArticleSearchBar;
