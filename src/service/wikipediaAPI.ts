import axios from "axios";
import Article from "../models/Article";

const WIKIPEDIA_URL =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
export const ARTICLE_URL = "https://en.wikipedia.org/?curid=";

export const fetchArticles = async (searchPhrase:string) => {
  const response = await axios.get(
    `${WIKIPEDIA_URL}${searchPhrase.trim().toLowerCase()}`
  );

  try {
    return response.data.query.search.map((articleData: Article) => {
      return new Article(
        articleData.pageid,
        articleData.title,
        articleData.snippet
      );
    });
  } catch (error) {
    throw new Error("Wrong server response");
  }
};
