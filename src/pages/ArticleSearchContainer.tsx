import ArticleSearchBar from "../components/ArticleSearch/ArticleSearchBar";
import { Grid, Typography } from "@material-ui/core";
import { FC, lazy, Suspense, useContext } from "react";
import WikiContext from "../store/wiki-context";

const ArticlesList = lazy(
  () => import("../components/ArticleSearch/ArticlesList")
);

const ArticleSearchContainer: FC = () => {
  const wikiCtx = useContext(WikiContext);

  const promptText = wikiCtx.showPrompt && (
    <Typography variant="h6">Search in Wikipedia</Typography>
  );

  return (
      <Grid item container xs={10} md={8} spacing={5}>
        <ArticleSearchBar />
        {promptText}
        <Suspense fallback={<div></div>}>
          {wikiCtx.showArticles && <ArticlesList />}
        </Suspense>
      </Grid>
  );
};

export default ArticleSearchContainer;
