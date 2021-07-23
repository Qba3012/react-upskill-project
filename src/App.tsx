import { Grid } from "@material-ui/core";
import { FC } from "react";
import ArticleSearchContainer from "./ArticleSearch/ArticleSearchContainer";
import CustomDialog from "./components/CustomDialog";

const App: FC = () => (
  <Grid container justify="center">
    <ArticleSearchContainer />
    <CustomDialog />
  </Grid>
);

export default App;
