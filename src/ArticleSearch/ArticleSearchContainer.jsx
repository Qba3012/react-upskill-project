import ArticleSearchBar from "./ArticleSearchBar";
import { Grid, Typography } from "@material-ui/core";
import ArticlesList from "./ArticlesList";
import CustomDialog from "../components/CustomDialog";
import { useContext } from "react";
import ApiContext from "../store/api-context";

const ArticleSearchContainer = () => {
  const apiCtx = useContext(ApiContext);

  const promptText = apiCtx.showPrompt && (
      <Typography variant="h6">Search in Wikipedia</Typography>
    );

  return (
    <Grid item container xs={10} md={8} spacing={5}>
      <ArticleSearchBar />
      {promptText}
      <ArticlesList />
      <CustomDialog />
    </Grid>
  );
};

ArticleSearchContainer.propTypes = {};

export default ArticleSearchContainer;
