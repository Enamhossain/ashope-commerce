
import { Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

const Content = () => {
  const categories = [
    {
      id: 1,
      name: "Men",
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6",
      link: "/products/collection/bestsellers/men's wear",
    },
    {
      id: 2,
      name: "Women",
      image: "https://ik.imagekit.io/w6fj5uuj5/dress?updatedAt=1741889999217",
      link: "/products/collection/women",
    },
    {
      id: 3,
      name: "Beauty",
      image: "https://ik.imagekit.io/w6fj5uuj5/pexels-photo-3735618.jpeg_auto=compress&cs=tinysrgb&w=600?updatedAt=1741873093149",
      link: "/products/collection/beauty care",
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://ik.imagekit.io/w6fj5uuj5/accorist?updatedAt=1741890048840",
      link: "/products/collection/gold & accessories",
    },
  ];

  return (
    <Box
    maxW="7xl" 
    mx="auto" 
    px={4} 
    py={16} 
   
  >
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={category.link}>
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-center font-medium tracking-wider">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
};

export default Content;
