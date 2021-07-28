import ArticleSearchBar from "./ArticleSearchBar";
import { Grid, Typography } from "@material-ui/core";
import { FC, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ArticlesList = lazy(() => import("./ArticlesList"));

const ArticleSearchContainer: FC = () => {
  const articles = useSelector((state: RootState) => state.articles.articles);

  const content =
    articles.length === 0 ? (
      <Typography variant="h6">Search in Wikipedia</Typography>
    ) : (
      <ArticlesList articles={articles} />
    );

  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <ArticleSearchBar />
      <Suspense fallback={<div></div>}>{content}</Suspense>
    </Grid>
  );
};

export default ArticleSearchContainer;
