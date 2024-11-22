export interface NewsArticle {
  title: string;
  urlToImage: string;
}

export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
  const apiKey = "a6a584c34c3a474a8131fd396c70119f";
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const articles = data.articles || [];
  return articles.map((article: any, index: number) => ({
    title: article.title || "No Title",
    urlToImage: "",
  }));
};
