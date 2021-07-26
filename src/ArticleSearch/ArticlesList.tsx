import { Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import ApiContext from "../store/api-context";
import Article from "./Article";

const ArticlesList: FC = () => {
  const apiCtx = useContext(ApiContext);

  return (
    <Grid item container spacing={5} component="ul">
      {apiCtx.articlesList.map((article) => (
        <Article
          key={article.pageid}
          title={article.title}
          snippet={article.snippet}
          url={article.url}
        />
      ))}
    </Grid>
  );
};

export default ArticlesList;
