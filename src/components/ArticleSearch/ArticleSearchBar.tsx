import {
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { ChangeEvent, FC, useContext } from "react";
import UIContext from "../../store/ui-context";
import WikiContext from "../../store/wiki-context";

const ArticleSearchBar: FC = () => {
  const wikiCtx = useContext(WikiContext);
  const uiCtx = useContext(UIContext);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    wikiCtx.onInputChange(event.target.value);
  };

  return (
    <Grid item container xs={12} alignItems="center">
      <TextField
        label="Search Article"
        value={wikiCtx.searchInput}
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
      {uiCtx.isLoading && <CircularProgress size={30} />}
    </Grid>
  );
};

export default ArticleSearchBar;
