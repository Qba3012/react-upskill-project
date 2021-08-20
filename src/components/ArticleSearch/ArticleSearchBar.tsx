import { ChangeEvent, FC, useContext } from "react";
import ApiContext from "../../store/api-context";
import SearchBar from "../UI/SearchBar";

const ArticleSearchBar: FC = () => {
  const apiCtx = useContext(ApiContext);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    apiCtx.onInputChange(event.target.value);
  };

  return (
    <SearchBar
      inputChangeHandler={inputChangeHandler}
      label="Search Article"
      isLoading={apiCtx.isLoading}
      value={apiCtx.searchInput}
    />
  );
};

export default ArticleSearchBar;
