import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const Carousel = ({ slides, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = useRef(slides.length); // Store slide count to avoid unnecessary re-renders

  // Autoplay Effect with Optimized Dependency Handling
  useEffect(() => {
    if (autoPlay) {
      const autoPlayInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount.current);
      }, interval);
      return () => clearInterval(autoPlayInterval);
    }
  }, [autoPlay, interval]); // Removed `slides.length` from dependencies

  // Prevent unnecessary re-creation of function on every render
  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="carousel-container relative overflow-hidden">
      {/* Image Slider */}
      <motion.div
        className="carousel-slide"
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {slides.length > 0 && slides[currentIndex] ? (
          <img
            src={slides[currentIndex].img}
            alt={slides[currentIndex].alt}
            width={800} // Prevents layout shift
            height={450} // Prevents layout shift
            className="w-full h-auto aspect-[16/9] object-cover"
          />
        ) : (
          <div className="text-center text-gray-500 py-20">No images available</div>
        )}
      </motion.div>

      {/* Dots Navigation */}
      <div className="carousel-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 min-h-[20px]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 `}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
