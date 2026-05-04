import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

import { AnimatePresence } from "framer-motion";

function Header() {
  const [sliders, setSliders] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
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

  useEffect(() => {
    if (!sliders.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliders]);

  useEffect(() => {
    const timer = setTimeout(() => onOpen(), 4000);
    return () => clearTimeout(timer);
  }, [onOpen]);

  if (isLoading) {
    return (
      <Flex height="700px" justify="center" align="center" bg="var(--background)">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="var(--primary)" />
      </Flex>
    );
  }

  const currentSlider = sliders[currentIndex] || {
    title: "Elevate Your Identity",
    subtitle: "Explore Feelby's Exclusive Fashion – Where Comfort Meets Creativity.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920"
  };

  return (
    <>
      <Box position="relative" width="100%" height={{ base: "500px", md: "650px", lg: "750px" }} overflow="hidden" bg="black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={currentSlider.image}
              alt="Hero image"
              objectFit="cover"
              width="100%"
              height="100%"
              loading="eager"
              filter="brightness(0.7)"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <Box 
          position="absolute" 
          inset="0" 
          bgGradient="linear(to-r, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)" 
          zIndex="1" 
        />

        <Box 
          position="absolute" 
          inset="0" 
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.8) 0%, transparent 40%)" 
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
              <Text 
                className="text-primary font-bold uppercase tracking-[0.3em] mb-4 text-sm"
              >
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
                {currentSlider.subtitle || "Explore Feelby's Exclusive Fashion – Where Comfort Meets Creativity. Shop the Trend, Wear the Vibe!"}
              </Text>

              <Flex gap="5">
                <Link to="/products">
                  <button className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-2xl shadow-primary/30 group">
                    <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
                    Shop Collection
                  </button>
                </Link>
                <button className="flex items-center gap-3 px-10 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all group border border-white/20">
                   Learn More
                   <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Flex>
            </Box>
          </motion.div>
        </Flex>

        {/* Slide Indicators */}
        <Flex 
          position="absolute" 
          bottom="10" 
          left="50%" 
          transform="translateX(-50%)" 
          gap="3" 
          zIndex="10"
        >
          {sliders.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === i ? "w-12 bg-primary" : "w-6 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </Flex>
      </Box>

      {/* Premium Offer Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay backdropFilter="blur(12px)" bg="blackAlpha.700" />
        <ModalContent 
          className="glass !bg-black/90 border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <ModalCloseButton className="!text-white !bg-white/5 !rounded-full !m-4 hover:!bg-white/10" />
          <Box className="relative">
             <Image
              src="https://img.freepik.com/free-vector/gradient-12-12-sale-background_23-2149166811.jpg"
              alt="Offer"
              width="100%"
            />
            <Box className="p-8 text-center bg-gradient-to-t from-black to-transparent absolute bottom-0 w-full pt-20">
               <Text className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Exclusive Offer</Text>
               <Heading className="text-white text-3xl mb-4 font-black">Summer Sale is Live!</Heading>
               <Button 
                className="!bg-primary !text-white !rounded-xl !px-8 !py-6 !font-bold hover:!bg-orange-600 !shadow-xl !shadow-primary/20"
                onClick={onClose}
               >
                 Claim My Discount
               </Button>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}


export default Header;