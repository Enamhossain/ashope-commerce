import React, { useEffect, useState } from "react";
import "./header.css";
import ScrollElement from "../scroll-Animated/scroll-element";
import { ChevronRight, ShoppingBag, X } from "lucide-react";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
const MotionBox = motion(Box);
function Header() {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showOffer, setShowOffer] = useState(false); // Offer popup state

  // Fetch banners from API
  useEffect(() => {
    async function fetchSliders() {
      try {
        const res = await api.get("/banners");
        setSliders(res.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSliders();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        sliders.length ? (prevIndex + 1) % sliders.length : 0
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [sliders]);

  // Show Offer Popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <>
    <Box position="relative" width="100%" height={{ base: "400px", md: "600px" }}>
      {/* Background Image */}
      <Image
        src={sliders[currentIndex]?.image || "/path/to/fallback-image.jpg"}
        alt="Hero background"
        objectFit="cover"
        width="100%"
        height="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
        loading="eager" // Prioritize loading
      />

      {/* Dark Overlay */}
      <Box position="absolute" inset="0" bg="blackAlpha.600" zIndex="1" />

      {/* Content */}
      <MotionBox
        className="hero-section flex justify-between items-center text-white px-5 md:px-12 lg:px-20 py-24 md:py-56 lg:py-52 text-left"
        position="relative"
        zIndex="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        willChange="opacity"
      >
        <Flex
          direction="column"
          maxW="600px"
          textAlign={{ base: "center", md: "left" }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "2rem", md: "4rem", lg: "5xl" }}
            fontWeight="bold"
            mb="4"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.7)"
          >
            Elevate Your Style, Define Your Identity
          </Heading>
          <Text
            fontSize={{ base: "1rem", md: "1.5rem", lg: "2xl" }}
            mb="6"
            color="whiteAlpha.800"
          >
            Explore Feelby’s Exclusive Fashion – Where Comfort Meets Creativity.
            Shop the Trend, Wear the Vibe!
          </Text>

          {/* CTA Buttons */}
          <Flex gap="4" justify={{ base: "center", md: "flex-start" }}>
            <Button
              bg="white"
              color="black"
              fontWeight="semibold"
              px="8"
              py="3"
              borderRadius="md"
              _hover={{ bg: "gray.200", transform: "scale(1.05)" }}
              willChange="transform"
              leftIcon={<ShoppingBag size={20} />}
            >
              Shop Now
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              fontWeight="semibold"
              px="8"
              py="3"
              borderRadius="md"
              _hover={{ bg: "whiteAlpha.300", transform: "scale(1.05)" }}
              willChange="transform"
              leftIcon={<ChevronRight size={20} />}
            >
              View More
            </Button>
          </Flex>
        </Flex>
      </MotionBox>
    </Box>

      {/* 
      {showOffer && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
          <div className="relative">
          
            <button
              onClick={() => setShowOffer(false)}
              className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md"
            >
              <X className="w-6 h-6 text-gray-700 hover:text-black" />
            </button>

        
            <img
              src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149166811.jpg?t=st=1741104718~exp=1741108318~hmac=36bbbf85e58512dcc2e187f353756aba674cb3724dec17006027951be2df15c0&w=1060" // Change this to your actual image path
              alt="Limited Time Offer"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div> 
      )}  */}
    </>
  );
}

export default Header;
