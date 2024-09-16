import { Grid } from "@material-ui/core";
import { FC, useContext } from "react";
import WikiContext from "../../store/wiki-context";
import Article from "./Article";

const ArticlesList: FC = () => {
  const wikiCtx = useContext(WikiContext);

  return (
    <Grid item container spacing={5} component="ul">
      {wikiCtx.articlesList.map((article) => (
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
