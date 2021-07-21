import axios from "axios";

const wikipediaUrl =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=";
const articleUrl = "https://en.wikipedia.org/?curid=";

export const fetchArticles = async (searchPhrase, dataHandler) => {
  const response = await axios.get(
    `${wikipediaUrl}${searchPhrase.trim().toLowerCase()}`
  );

  try {
    const transformedData = response.data.query.search.map((articleData) => {
      return {
        pageid: articleData.pageid,
        title: articleData.title,
        snippet: articleData.snippet,
        url: `${articleUrl}${articleData.pageid}`,
      };
    });
    dataHandler(transformedData);
  } catch (error) {
    throw new Error("Wrong server response");
  }
};
