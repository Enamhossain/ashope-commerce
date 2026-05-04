import { useState, useRef, useEffect } from "react";
import {  Text, Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { SpotLightItem, Spotlight } from "../spotlight/spotlight";
import ScrollElement from "../scroll-Animated/scroll-element";


const items = [
  {
    title: "DROP SHOULDER T-SHIRTS",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "POLO T-SHIRTS",
    image: "https://images.unsplash.com/photo-1609871975766-8e6d0f2a4a8e?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "PREMIUM PANJABI",
    image: "https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-ukranian-shirt_23-2149318757.jpg",
  },
  {
    title: "SOLID OXFORD SHIRTS",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "VINTAGE DENIM",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "LUXURY ACCESSORIES",
    image: "https://images.unsplash.com/photo-1613386383197-ada753d9b0e6?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "SALWAR KAMEEZ",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "ELITE PERFUME",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
  },
];

function GalleryComponent() {
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [carousel]);

  return (
    <Box py={24} bg="black">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text className="text-primary font-bold uppercase tracking-[0.3em] mb-4 text-sm">Our Curation</Text>
          <Heading color="white" className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
            Explore Our <span className="text-gradient">New Collection</span>
          </Heading>
          <Text className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the latest trends in high-performance fashion, featuring bold designs and artisanal craftsmanship to elevate your personal style.
          </Text>
        </motion.div>
      </div>

      <ScrollElement
        direction="right"
        viewport={{ amount: 0.1 }}
      >
        <Spotlight className="w-full mx-auto overflow-hidden">
          <motion.div
            ref={carousel}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex cursor-grab active:cursor-grabbing px-6 space-x-8"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="min-w-[22rem] group"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <SpotLightItem>
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1067' viewBox='0 0 800 1067'%3E%3Crect width='800' height='1067' fill='%231a1a1a'/%3E%3C/svg%3E";
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <Text className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-2">Category</Text>
                      <h3 className="text-white text-2xl font-bold tracking-tight mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <button className="text-xs font-bold text-white flex items-center gap-2 group/btn">
                         Shop Collection
                         <div className="w-6 h-px bg-primary group-hover/btn:w-10 transition-all" />
                      </button>
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


