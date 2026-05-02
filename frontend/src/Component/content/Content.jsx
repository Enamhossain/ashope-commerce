
import { Link } from "react-router-dom";

import { Box } from "@chakra-ui/react";

const Content = () => {
  const categories = [
    {
      id: 1,
      name: "Men's Collection",
      tag: "Essentials",
      image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=800",
      link: "/products/collection/bestsellers/men's wear",
    },
    {
      id: 2,
      name: "Women's Couture",
      tag: "Luxury",
      image: "https://ik.imagekit.io/w6fj5uuj5/dress?updatedAt=1741889999217",
      link: "/products/collection/women",
    },
    {
      id: 3,
      name: "Beauty & Care",
      tag: "Premium",
      image: "https://ik.imagekit.io/w6fj5uuj5/pexels-photo-3735618.jpeg_auto=compress&cs=tinysrgb&w=600?updatedAt=1741873093149",
      link: "/products/collection/beauty care",
    },
    {
      id: 4,
      name: "Elite Accessories",
      tag: "Artisan",
      image: "https://ik.imagekit.io/w6fj5uuj5/accorist?updatedAt=1741890048840",
      link: "/products/collection/gold & accessories",
    },
  ];

  return (
    <Box maxW="1400px" mx="auto" px={6} py={24}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link key={category.id} to={category.link}>
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 aspect-[3/4.5] shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/20">
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <Text className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-3">{category.tag}</Text>
                <h3 className="text-white text-3xl font-black leading-tight tracking-tighter mb-6">
                  {category.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h3>
                <div className="flex items-center gap-3 text-white/50 group-hover:text-white transition-colors">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Explore Now</span>
                  <div className="w-10 h-px bg-white/20 group-hover:bg-primary group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Box>
  );
};


export default Content;
