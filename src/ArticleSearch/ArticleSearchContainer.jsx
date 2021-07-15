import React, { useEffect, useState } from "react";
import ArticleSearchBar from "./ArticleSearchBar";
import { articles } from "./resources/Articles";
import { Grid, Typography } from "@material-ui/core";
import ArticlesList from "./ArticlesList";

const ArticleSearchContainer = () => {
  const [searchInput, setSearchInput] = useState("");
  const [displayArticles, setDisplayArticles] = useState(articles);

  const filterArticles = (searchTitle) => {
    const searchPhrase = searchTitle.trim().toLowerCase();
    if (searchPhrase === "") {
      return [];
    } else {
      return articles.filter((article) =>
        article.title.toLowerCase().includes(searchPhrase)
      );
    }
  };

  const resetArticlesList = () => {
    if (searchInput.trim() === "") {
      setSearchInput("");
      setDisplayArticles(articles);
    }
  };

  useEffect(() => {
    if (searchInput !== "") {
      const filteredArticles = filterArticles(searchInput);
      const displayArticlesJSON = JSON.stringify(displayArticles);
      const filteredArticlesJSON = JSON.stringify(filteredArticles);
      if (displayArticlesJSON !== filteredArticlesJSON) {
        setDisplayArticles(filteredArticles);
      }
    }
    const displayArticlesJSON = JSON.stringify(displayArticles);
  }, [searchInput, displayArticles]);

  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <ArticleSearchBar
        searchText={searchInput}
        onSearchTitleChange={setSearchInput}
        onBlurHandler={resetArticlesList}
      />
      {displayArticles.length === 0 && (
        <Typography variant="h6">No articles found</Typography>
      )}
      <ArticlesList articles={displayArticles} />
    </Grid>
  );
};

ArticleSearchContainer.propTypes = {};

export default ArticleSearchContainer;
