import React, { useEffect, useState } from "react";
import ArticleSearchBar from "./ArticleSearchBar";
import { Grid, Typography } from "@material-ui/core";
import ArticlesList from "./ArticlesList";
import { fetchArticles } from "../service/wikipediaAPI";
import { useCallback } from "react";
import CustomDialog from "../components/CustomDialog";

const ArticleSearchContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [displayArticles, setDisplayArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    if (searchInput !== "") {
      setIsLoading(true);

      try {
        await fetchArticles(searchInput, setDisplayArticles);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setDisplayArticles([]);
    }
  }, [searchInput]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchInput, fetchData]);

  const onDialogCloseHandler = () => {
    setError("");
  };

  const displayPromptText = displayArticles.length === 0 && !isLoading;
  const displayArticlesList = !isLoading && error === "";
  const displayErrorDialog = !isLoading && error !== "";

  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <ArticleSearchBar
        searchText={searchInput}
        onSearchTitleChange={setSearchInput}
        isLoading={isLoading}
      />
      {displayPromptText && (
        <Typography variant="h6">Search in Wikipedia</Typography>
      )}
      {displayArticlesList && <ArticlesList articles={displayArticles} />}
      <CustomDialog
        open={displayErrorDialog}
        message={error}
        onClose={onDialogCloseHandler}
      />
    </Grid>
  );
};

ArticleSearchContainer.propTypes = {};

export default ArticleSearchContainer;
