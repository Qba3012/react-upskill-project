import { Grid } from "@material-ui/core";
import { FC } from "react";
import ArticleSearchContainer from "./ArticleSearch/ArticleSearchContainer";

export const App: FC = () => (
  <Grid container justify="center">
    <ArticleSearchContainer />
  </Grid>
);

export default App;