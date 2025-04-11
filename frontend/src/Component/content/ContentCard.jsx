import React, { useState, useEffect, useMemo } from "react";
import { Box, Text, Button, Spinner, Image } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { debounce } from "lodash";
import api from "../../utils/api";

const LazyImage = ({ src, alt, className, loading = "lazy" }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => setIsLoaded(true);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      onLoad={handleLoad}
      loading={loading}
      style={{ width: "inherit" }} // Ensure width is set to prevent CLS
    />
  );
};

export default function ContentCard() {
  const [sliders, setSliders] = useState([]);
  const [currentSlider, setCurrentSlider] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banners from API
  useEffect(() => {
    async function fetchSliders() {
      try {
        const res = await api.get("/banners");
        setSliders(res.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        setError("Failed to load sliders.");
      } finally {
        setLoading(false);
      }
    }

    fetchSliders();
  }, []);

  // Update screen size with debounce
  useEffect(() => {
    const handleResize = debounce(() => {
      setIsSmallScreen(window.innerWidth <= 768);
    }, 200);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlider = () => {
    setCurrentSlider((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  const nextSlider = () => {
    setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  };

  const carouselTransform = useMemo(() => {
    return `translateX(-${currentSlider * (isSmallScreen ? 98 : 200)}px)`;
  }, [currentSlider, isSmallScreen]);

  if (loading) {
    return (
      <Box
        className="w-full h-[50vh] sm:h-96 md:h-[740px] flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10 relative bg-cover"
        style={{ backgroundImage: `url(/path/to/fallback-image.jpg)` }}
      >
        <Spinner
          size="xl"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        />
      </Box>
    );
  }

  if (error || sliders.length === 0) {
    return <Text color="red.500">{error || "No sliders available."}</Text>;
  }

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          href={sliders[0]?.image || "/path/to/fallback-image.jpg"}
          as="image"
        />
      </Helmet>
      <Box
        className="w-full h-[50vh] sm:h-96 md:h-[740px] flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-10 relative overflow-hidden z-50"
      >
        {/* Background Image */}
        <Image
          src={
            sliders.length > 0
              ? currentSlider === 0
                ? sliders[sliders.length - 1].image
                : sliders[currentSlider - 1].image
              : "/path/to/fallback-image.jpg"
          }
          alt="Slider background"
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex="0"
          loading="eager"
        />
        {/* Overlay */}
        <Box
          className="absolute inset-0 bg-black/50 z-10"
        />

        {/* Slider Controls */}
        <Box className="absolute bottom-1 md:bottom-1/4 flex gap-3 z-50 px-5">
          <Button
            onClick={prevSlider}
            className="w-8 h-8 bg-black/50 rounded-full text-white"
          >
            &lt;
          </Button>
          <Button
            onClick={nextSlider}
            className="w-8 h-8 bg-purple-300 rounded-full text-white"
          >
            &gt;
          </Button>
        </Box>

        {/* Image Carousel */}
        <Box className="w-full sm:w-1/2 hidden md:block ml-auto overflow-hidden absolute -right-5 lg:-right-16 z-50 px-4 py-10">
          <Box
            className="ease-linear duration-300 flex gap-4 items-center"
            style={{
              transform: carouselTransform,
              willChange: "transform",
            }}
          >
            {sliders.map((slide, inx) => (
              <LazyImage
                key={inx}
                src={slide.image}
                alt={slide.title}
                loading={inx === 0 ? "eager" : "lazy"}
                className={`h-[180px] sm:h-[200px] lg:h-[320px] min-w-[90px] lg:min-w-[184px] ${
                  currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"
                } drop-shadow-lg shadow-lg shadow-black bg-black/50 duration-300 rounded-lg z-50`}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}