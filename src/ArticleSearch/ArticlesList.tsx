import { Grid } from "@material-ui/core";
import { FC } from "react";
import Article from "../models/Article";
import ArticleComponent from "./ArticleComponent";

type Props = {
  articles: Article[];
};

const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <Grid item container spacing={5} component="ul">
      {articles.map((article) => (
        <ArticleComponent
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
