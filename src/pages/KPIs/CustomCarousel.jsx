import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomCarousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : children?.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < children?.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [children]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = currentIndex * carousel.offsetWidth;
      carousel.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  }, [currentIndex]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Carousel Items */}
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          scrollBehavior: "smooth",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {children?.map((child, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 auto",
              width: "100%",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {child}
          </Box>
        ))}
      </Box>

      {/* Left Arrow */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default CustomCarousel;
