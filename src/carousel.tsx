// src/Carousel.tsx

import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { fetchLatestNews, NewsArticle } from "./apiService";

interface CarouselProps {
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({ autoPlayInterval = 5000 }) => {
  const [items, setItems] = useState<NewsArticle[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestNews();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const maxIndex = items.length - 1;

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  useEffect(() => {
    if (items.length === 0) return;

    const intervalId = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(intervalId);
  }, [activeIndex, autoPlayInterval, items.length]);

  if (items.length === 0) {
    return (
      <Box
        sx={{
          width: "502px",
          height: "321px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption">Loading...</Typography>
      </Box>
    );
  }

  // Use internal images as fallback
  const fallbackImages = [
    "/img/vegetable-item-4.jpg",
    "/img/vegetable-item-5.jpg",
    "/img/vegetable-item-6.jpg",
    "/img/featur-1.jpg",
    "/img/featur-2.jpg",

    // Ensure these paths are correct
  ];

  return (
    <Box
      sx={{
        width: "502px",
        height: "321px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: 3,
      }}
    >
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        src={
          items[activeIndex].urlToImage ||
          fallbackImages[activeIndex % fallbackImages.length]
        }
        alt={items[activeIndex].title}
        onError={(e: any) => {
          e.target.src = fallbackImages[activeIndex % fallbackImages.length];
        }}
      />
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 1,
          backgroundColor: "#fff",
          color: "rgba(0, 0, 0, 0.55)",
          textAlign: "center",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        {items[activeIndex].title}
      </Typography>
      <Button
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 10,
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          minWidth: "auto",
          padding: 1,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <KeyboardArrowLeft />
      </Button>
      <Button
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          minWidth: "auto",
          padding: 1,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <KeyboardArrowRight />
      </Button>
    </Box>
  );
};

export default Carousel;
