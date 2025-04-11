import React from "react";
import { useState } from "react";
import ScrollElement from "../scroll-Animated/scroll-element";
import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {} from "lucide-react";
import {
  ShoppingBag,
  Shirt,
  Package,
  Crown,
  Glasses,
  ShoppingCart,
  Diamond,
  Store,
  Sparkles,
  Play,
  Send,
} from "lucide-react";
import img1 from "../../assets/blog1.jpg";
import img2 from "../../assets/blog2.jpg";
import UnderlinedText from "../underlinetext/underLineText";
const BlogHighlights = () => {
  const MotionHeading = motion(Heading);

  const brands = [
    { name: "Vitra", Icon: Shirt },
    { name: "Boshults", Icon: ShoppingBag },
    { name: "PackIt", Icon: Package },
    { name: "Niche", Icon: Crown },
    { name: "Magisso", Icon: Store },
    { name: "Louis Poulsen", Icon: Diamond },
    { name: "Klober", Icon: ShoppingCart },
    { name: "Joseph Joseph", Icon: Glasses },
    { name: "HAY", Icon: Sparkles },
  ];
  return (
    <div>
      <MotionHeading
        mb={8}
        textAlign="center"
        bgClip="text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.1,
          bgGradient: "linear(to-r, pink.400, blue.400)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fontSize="5xl"
        fontWeight="semibold"
      >
        <span className="text-red-500 uppercase">Discover</span>{" "}
        <span className="text-gray-900 uppercase">Exclusive Deals</span>
      </MotionHeading>
      <Box py={26}>
        <ScrollElement
          direction="right"
          viewport={{ amount: 0.5, margin: "0px 0px 0px 0px" }}
        >
          <div className=" bg-white">
            <section className="container mx-auto px-4 py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6 lg:pr-12">
                  <span className="text-gray-600 text-sm md:text-base">
                    Embrace the elegance of traditional wear
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight">
                    Discover the beauty of{" "}
                    <span className="text-pink-500 font-bold">
                      Salwar Kameez
                    </span>
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Explore our exclusive collection of finely crafted Salwar
                    Kameez, featuring vibrant colors, intricate embroidery, and
                    modern designs tailored for the perfect blend of comfort and
                    tradition. Whether for daily wear or special occasions, our
                    collection ensures you shine with elegance.
                  </p>

                  <button className="inline-flex items-center px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 text-sm md:text-base">
                    VIEW MORE
                  </button>
                </div>

                <div className="relative grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={img1}
                      alt="Fashion model wearing white crop top"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                    <img
                      src={img2}
                      alt="Fashion model in casual wear"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300">
                        <Play className="w-8 h-8 text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ScrollElement>

        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-center text-gray-400 text-sm font-medium tracking-wider uppercase mb-12">
              Trusted by world-class brands
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center">
              {brands.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center group cursor-pointer"
                >
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors mb-2" />
                  <span className="text-gray-400 uppercase font-medium text-sm group-hover:text-gray-600 transition-colors">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative ">
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://ik.imagekit.io/w6fj5uuj5/photo-1635944201335-f9165880a0b6_q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D?updatedAt=1741864206104")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>

          <div className="relative h-screen flex items-center">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Image with Play Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative group"
                >
                  <img
                    src="https://ik.imagekit.io/w6fj5uuj5/photo-1598106755735-3ebfced1d38b_q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D?updatedAt=1741864282874"
                    alt="Fashion Model"
                    className="w-full h-[320px] md:h-[700px] object-cover rounded-lg shadow-2xl"
                  />
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                          bg-white/90 hover:bg-white transition-all duration-300
                          w-16 h-16 rounded-full flex items-center justify-center
                          group-hover:scale-110"
                  >
                    <Play className="w-6 h-6 text-gray-900" />
                  </motion.button>
                </motion.div>

                {/* Right Side - Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white space-y-6 lg:pl-8"
                >
                  <div className="uppercase tracking-wider text-sm font-medium text-gray-300">
                    They will give birth to the carrier
                  </div>

                  <div className="relative py-16 px-8 max-w-5xl mx-auto overflow-hidden">
                    {/* Main heading with decorative shapes */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-200 relative z-10"
                    >
                      Enjoy the best quality and features made by{" "}
                      <span className="relative inline-block px-3 py-1 font-semibold text-3xl group">
                        {/* Decorative blob behind "Squadpark" */}
                        <span className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg -z-10 transform group-hover:scale-105 transition-transform duration-300"></span>
                        {/* Decorative circle */}
                        <span className="absolute -top-6 -right-4 w-6 h-6 border-2 border-dashed border-blue-300 rounded-full"></span>
                        {/* Decorative dots pattern */}
                        <div className="absolute -bottom-6 -left-2 grid grid-cols-3 gap-1">
                          <span className="w-1.5 h-1.5 bg-purple-300 rounded-full"></span>
                          <span className="w-1.5 h-1.5 bg-purple-300 rounded-full"></span>
                          <span className="w-1.5 h-1.5 bg-purple-300 rounded-full"></span>
                        </div>
                        <UnderlinedText>Squadpark</UnderlinedText>
                      </span>
                    </motion.h1>

                    {/* Decorative elements */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl -z-10"
                    ></motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-5 right-10 w-32 h-16 bg-gradient-to-br from-pink-200/20 to-blue-200/20 rounded-full blur-xl -z-10"
                    ></motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-300 text-lg lg:text-lg max-w-xl"
                  >
                    Also, always the clinical level, and my tincidunt will be
                    followed by a. In who is the teacher from But no one said
                    the price. Home to drink the quiver.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-wrap gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium
                           hover:bg-gray-100 transition-colors duration-300"
                    >
                      SHOP NOW
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="border border-white text-white px-8 py-3 rounded-full font-medium
                           hover:bg-white/10 transition-colors duration-300"
                    >
                      VIEW MORE
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Features />
      <CustomerTestimonials />
    </div>
  );
};

export default BlogHighlights;

// Animation Variants
const fadeDownVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

export const CustomerTestimonials = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear input field
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="relative ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://ik.imagekit.io/w6fj5uuj5/photo-1594969155368-f19485a9d88c_q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA_3D_3D?updatedAt=1741864618231")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <motion.div
        variants={fadeDownVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-[70vh] flex items-center justify-center px-4"
      >
        <motion.div
          variants={fadeDownVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeDownVariants}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20"
          >
            <p className="text-red-600 font-medium tracking-wider mb-4">
              EXCLUSIVE OFFERS AWAIT
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Hi there, sign up and connect
              <br />
              to SquadPark
            </h2>

            <p className="text-gray-200 text-lg mb-8">
              Be the first to learn about our latest trends and get exclusive
              offers.
            </p>

            <motion.form
              variants={fadeDownVariants}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-500 hover:bg-gray-800 hover:font-bold text-white font-medium rounded-lg flex items-center gap-2 transition-all"
                >
                  Subscribe
                  <Send size={18} />
                </button>
              </div>
            </motion.form>

            {message && (
              <motion.div
                variants={fadeDownVariants}
                className="mt-4 text-green-400"
              >
                {message}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Features Section with Animation
export const Features = () => {
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free Shipping for orders over BDT ৳1000",
    },
    {
      icon: "💳",
      title: "Money Guarantee",
      description: "Within 3 days for an exchange.",
    },
    {
      icon: "💼",
      title: "Flexible Payment",
      description: "Pay with Multiple Credit Cards & Mobile Banking",
    },
    {
      icon: "🛠️",
      title: "Online Support",
      description: "24 hours a day, 7 days a week support",
    },
  ];

  return (
    <motion.div
      variants={fadeDownVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center items-center gap-8 p-10 mt-9 bg-white"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={fadeDownVariants}
          className="flex flex-col items-center text-center space-y-2"
        >
          <Box className="flex justify-center items-center w-12 h-12 rounded-full border border-gray-300">
            <Text className="text-xl">{feature.icon}</Text>
          </Box>
          <Heading size="sm" className="font-semibold text-black">
            {feature.title}
          </Heading>
          <Text className="text-gray-500 text-sm">{feature.description}</Text>
        </motion.div>
      ))}
    </motion.div>
  );
};
