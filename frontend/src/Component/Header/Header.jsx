import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import { ChevronRight, ShoppingBag } from "lucide-react";
import api from "../../utils/api";
import { motion } from "framer-motion";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
} from "@chakra-ui/react";

import { AnimatePresence } from "framer-motion";

// ─── Fallback image (base64 dark placeholder — no network request) ────────────
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='750' viewBox='0 0 1920 750'%3E%3Crect width='1920' height='750' fill='%23111'/%3E%3C/svg%3E";

// ─── Skeleton loader for the hero ─────────────────────────────────────────────
function HeroSkeleton() {
  return (
    <Box
      position="relative"
      width="100%"
      height={{ base: "500px", md: "650px", lg: "750px" }}
      bg="black"
      overflow="hidden"
    >
      {/* Animated shimmer */}
      <Box
        position="absolute"
        inset="0"
        bgGradient="linear(to-r, gray.900 0%, gray.800 50%, gray.900 100%)"
        sx={{
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s infinite linear",
          "@keyframes shimmer": {
            "0%":   { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition: "200% 0" },
          },
        }}
      />
      {/* Centered spinner */}
      <Flex height="100%" justify="center" align="center">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="var(--primary)" />
      </Flex>
    </Box>
  );
}

// ─── Hero image with error fallback ───────────────────────────────────────────
function HeroImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  // Reset when slide changes
  useEffect(() => { setImgSrc(src); }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(FALLBACK_IMG)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter: "brightness(0.7)",
      }}
      // fetchpriority is the modern standard (replaces the deprecated Chakra `loading="eager"`)
      fetchPriority="high"
      decoding="async"
    />
  );
}

function Header() {
  const [sliders, setSliders]       = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading]   = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchSliders() {
      try {
        const res = await api.get("/banners");
        if (!cancelled) setSliders(res.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
        if (!cancelled) setFetchError(true); // show fallback slide instead of blank
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    fetchSliders();
    return () => { cancelled = true; };
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (!sliders.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliders]);

  if (isLoading) return <HeroSkeleton />;

  // If API fails or returns empty, use default fallback slide
  const defaultSlide = {
    title: "Elevate Your Identity",
    subtitle:
      "Explore Ashop's Exclusive Fashion – Where Comfort Meets Creativity.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920",
  };

  const slides = sliders.length > 0 ? sliders : [defaultSlide];
  const currentSlider = slides[currentIndex] ?? defaultSlide;

  return (
    <>
      <Box
        position="relative"
        width="100%"
        height={{ base: "500px", md: "650px", lg: "750px" }}
        overflow="hidden"
        bg="black"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <HeroImage
              src={currentSlider.image}
              alt={currentSlider.title || "Hero image"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlays */}
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-r, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
          zIndex="1"
        />
        <Box
          position="absolute"
          inset="0"
          bgGradient="linear(to-t, rgba(0,0,0,0.8) 0%, transparent 40%)"
          zIndex="1"
        />

        {/* Content */}
        <Flex
          position="relative"
          zIndex="2"
          height="100%"
          width="100%"
          maxW="1400px"
          mx="auto"
          direction="column"
          justify="center"
          px={{ base: 6, md: 20 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Box maxW="700px">
              <Text className="text-primary font-bold uppercase tracking-[0.3em] mb-4 text-sm">
                New Collection 2026
              </Text>

              <Heading
                as="h1"
                fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
                className="text-white font-extrabold tracking-tight leading-[1.1] mb-6"
              >
                {currentSlider.title || "Elevate Your Style, Define Your Identity"}
              </Heading>

              <Text
                fontSize={{ base: "lg", md: "xl" }}
                className="text-gray-300 mb-10 leading-relaxed max-w-lg"
              >
                {currentSlider.subtitle ||
                  "Explore Ashop's Exclusive Fashion – Where Comfort Meets Creativity. Shop the Trend, Wear the Vibe!"}
              </Text>

              <Flex gap="5" flexWrap="wrap">
                <Link to="/products">
                  <button className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-2xl shadow-primary/30 group">
                    <ShoppingBag
                      size={20}
                      className="group-hover:rotate-12 transition-transform"
                    />
                    Shop Collection
                  </button>
                </Link>
                <button className="flex items-center gap-3 px-10 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all group border border-white/20">
                  Learn More
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Flex>
            </Box>
          </motion.div>
        </Flex>

        {/* Slide Indicators — only show when there are multiple slides */}
        {slides.length > 1 && (
          <Flex
            position="absolute"
            bottom="10"
            left="50%"
            transform="translateX(-50%)"
            gap="3"
            zIndex="10"
          >
            {slides.map((_, i) => (
              <Box
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === i
                    ? "w-12 bg-primary"
                    : "w-6 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </Flex>
        )}
      </Box>
    </>
  );
}

export default Header;