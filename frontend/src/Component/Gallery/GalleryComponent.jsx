import { useState, useRef, useEffect } from "react";
import {  Text, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SpotLightItem, Spotlight } from "../spotlight/spotlight";
import ScrollElement from "../scroll-Animated/scroll-element";


const items = [
  {
    title: "DROP SHOULDER T-SHIRTS",
    image: "",
  },
  {
    title: "POLO T-SHIRTS",
    image: "https://images.unsplash.com/photo-1609871975766-8e6d0f2a4a8e?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Panjabi",
    image: "https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-ukranian-shirt_23-2149318757.jpg",
  },
  {
    title: "SOLID SHIRTS",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "DENIM",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "ACCESSORIES",
    image: "https://ik.imagekit.io/w6fj5uuj5/Images/img2.jpg?updatedAt=1741455821425",
  },
  {
    title: "SALWAR KAMEEZ (GIRLS)",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "SUMMER COLLECTION",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "PERFUME",
    image: "/",
  },
  {
    title: "JEWELRY",
    image: "https://images.unsplash.com/photo-1613386383197-ada753d9b0e6?auto=format&fit=crop&q=80&w=800",
  },
];

function GalleryComponent() {
  const MotionHeading = motion(Heading);

  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  // Adjust the width calculation to reflect the proper size for drag
  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel]);

  return (
    <Box textAlign="center" mb={8}>
      <Box position="relative" textAlign="center" mb={8} p={8}>
        <MotionHeading
          mb={10}
          mt={10}
          textAlign="center"
          bgClip="text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.1,
            bgGradient: "linear(to-r, pink.400, blue.400)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
       <span className="text-red-500 uppercase">Explore Our </span>{" "}
<span className="text-gray-900 uppercase">New Collection</span>

        </MotionHeading>

        <Box
          position="absolute"
          top="0"
          left="30%"
          transform="translate(-50%, -50%)"
          zIndex="-1"
          width="50px"
          height="40px"
          opacity={0.3}
        >
        
        </Box>
        <Text 
  sx={{ 
    maxWidth: "md", 
    marginX: "auto", 
    color: "gray.500", 
    fontSize: ["sm", "md", "lg"], 
    fontWeight: "medium" 
  }}
>
  Discover the latest trends in fashion, featuring bold designs and vibrant 
  colors to elevate your style. Shop now and refresh your wardrobe with our 
  exclusive new arrivals!
</Text>


        <Box
          position="absolute"
          top="0"
          left="70%"
          transform="translate(-50%, -50%)"
          zIndex="-1"
          width="50px"
          height="40px"
          opacity={0.3}
        >
        
        </Box>
      </Box>

      <ScrollElement
        direction="right"
        viewport={{ amount: 0.5, margin: "0px 0px 0px 0px" }}
      >
        <Spotlight className="w-full mx-auto container overflow-hidden p-6">
          <motion.div
            ref={carousel}
            drag="x"
            whileDrag={{ scale: 0.95 }}
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }} // Updated to use proper drag constraints
            className="flex cursor-grab active:cursor-grabbing space-x-4"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="min-w-[20rem] min-h-[25rem] p-2 group relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Spotlight Container */}
                <SpotLightItem>
                  <div className="aspect-[3/4] relative">
                    {/* <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <h3 className="text-white text-xl font-bold tracking-wider">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </SpotLightItem>
              </motion.div>
            ))}
          </motion.div>
        </Spotlight>
      </ScrollElement>
    </Box>
  );
}

export default GalleryComponent;


