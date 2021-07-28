import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Grid,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { articlesActions } from "../store/articles-slice";
import { fetchArticles } from "../service/api-actions";

const ArticleSearchBar: FC = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (searchInput === "") {
        dispatch(articlesActions.setArticles({ articles: [] }));
      } else {
        dispatch(fetchArticles(searchInput));
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchInput, dispatch]);

  return (
    <Grid item container xs={12} alignItems="center">
      <TextField
        label="Search Article"
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

export default ArticleSearchBar;
