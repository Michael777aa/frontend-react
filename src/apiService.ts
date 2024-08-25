// src/apiService.ts

export interface NewsArticle {
  title: string;
  urlToImage: string;
}

// Example internal image paths
const internalImages = [
  "/img/nusret.jpg",
  "/img/nusret2.jpg",
  "/img/nusret3.jpg",
  // Add more paths as needed
];

// Fetch latest news articles from NewsAPI
export const fetchLatestNews = async (): Promise<NewsArticle[]> => {
  const apiKey = "a6a584c34c3a474a8131fd396c70119f"; // Replace with your NewsAPI key
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const articles = data.articles || [];

  // Map API articles to include internal images
  return articles.map((article: any, index: number) => ({
    title: article.title || "No Title",
    // Placeholder image URL to be replaced by the Carousel component
    urlToImage: "",
  }));
};
