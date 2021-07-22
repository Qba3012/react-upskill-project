import { ARTICLE_URL } from "../service/wikipediaAPI";

class Article {
  pageid: string;
  title: string;
  snippet: string;
  url: string;

  constructor(pageid: string, title: string, snippet: string) {
      this.pageid = pageid;
      this.title = title;
      this.snippet = snippet;
      this.url = ARTICLE_URL + pageid;
  }
  
}

export default Article;
