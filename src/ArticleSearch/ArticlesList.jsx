import { useContext } from "react";
import ApiContext from "../store/api-context";
import Article from "./Article";

const ArticlesList = () => {
  const apiCtx = useContext(ApiContext);

  return (
    <>
      {apiCtx.showArticles &&
        apiCtx.articlesList.map((article) => (
          <Article
            key={article.pageid}
            title={article.title}
            snippet={article.snippet}
            url={article.url}
          />
        ))}
    </>
  );
};

export default ArticlesList;
