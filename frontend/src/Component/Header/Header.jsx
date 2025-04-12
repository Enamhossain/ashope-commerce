import React, { useEffect, useState } from "react";
import { ChevronRight, ShoppingBag, X } from "lucide-react";
import api from "../../utils/api";
import { motion } from "framer-motion";
import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  Image, 
  Text, 
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

function Header() {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra's modal handling

  // Fetch banners from API
  useEffect(() => {
    async function fetchSliders() {
      try {
        const res = await api.get("/banners");
        setSliders(res.data);
      } catch (err) {
        console.error("Error fetching sliders:", err);
      } finally {
        setIsLoading(false);
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
      onOpen();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onOpen]);

  if (isLoading) {
    return (
      <Flex 
        height={{ base: "400px", md: "600px" }}
        justify="center" 
        align="center"
        bg="gray.900"
      >
        <Spinner 
          size="xl" 
          thickness="4px"
          speed="0.65s"
          color="white" 
        />
      </Flex>
    );
  }

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
        <MotionFlex
          position="relative"
          zIndex="2"
          height="100%"
          width="100%"
          direction="column"
          justify="center"
          px={{ base: 5, md: 12, lg: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Box
            maxW="600px"
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              mb="4"
              textShadow="2px 2px 8px rgba(0, 0, 0, 0.7)"
              color="white"
            >
              Elevate Your Style, Define Your Identity
            </Heading>
            <Text
              fontSize={{ base: "md", md: "xl", lg: "2xl" }}
              mb="6"
              color="whiteAlpha.800"
            >
              Explore Feelby's Exclusive Fashion – Where Comfort Meets Creativity.
              Shop the Trend, Wear the Vibe!
            </Text>

            {/* CTA Buttons */}
            <Flex gap="4" justify={{ base: "center", md: "flex-start" }}>
              <Button
                bg="white"
                color="black"
                fontWeight="semibold"
                px="8"
                py="6"
                borderRadius="md"
                _hover={{ bg: "gray.200", transform: "scale(1.05)" }}
                leftIcon={<ShoppingBag size={20} />}
                size={{ base: "md", md: "lg" }}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                borderColor="white"
                color="white"
                fontWeight="semibold"
                px="8"
                py="6"
                borderRadius="md"
                _hover={{ bg: "whiteAlpha.300", transform: "scale(1.05)" }}
                leftIcon={<ChevronRight size={20} />}
                size={{ base: "md", md: "lg" }}
              >
                View More
              </Button>
            </Flex>
          </Box>
        </MotionFlex>
      </Box>

      {/* Offer Popup using Chakra Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="lg" overflow="hidden" maxW={{ base: "90%", md: "500px" }}>
          <ModalCloseButton 
            zIndex="2" 
            bg="white" 
            borderRadius="full" 
            size="lg"
            color="gray.700"
            _hover={{ color: "black", bg: "gray.100" }}
          />
          <Image
            src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149166811.jpg"
            alt="Limited Time Offer"
            width="100%"
            height="auto"
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default Header;