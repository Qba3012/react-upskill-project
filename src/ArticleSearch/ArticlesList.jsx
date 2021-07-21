import Article from "./Article";

const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
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
