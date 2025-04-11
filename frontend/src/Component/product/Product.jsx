import { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Button,
  Flex,
  Collapse,
  Grid,
} from "@chakra-ui/react";

import { motion } from "framer-motion";
import ProductCard from "./productCard";
import NavMenu from "./Navmenu";
import api from "../../utils/api";
import UnderlinedText from "../underlinetext/underLineText";


function Product() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const MotionHeading = motion(Heading);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await  api.get("/products/collection");
        const data = response.data.products;
        const filteredProducts = data.filter((product) => {
          return (
            categoryFilter === "All" || 
            product.category === categoryFilter || 
            product.nestedSubcategory.toLowerCase() === categoryFilter.toLowerCase() 
          );
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    setCurrentPage(1); 
  }, [categoryFilter]);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box position="relative">
      <MotionHeading
        className=" font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
        mb={8}
        textAlign="center"
        bgClip="text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.2,
          bgGradient: "linear(to-r, teal.400, blue.400)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fontSize="4xl"
        marginTop="20px"
      >
        <UnderlinedText>

        <span className="text-red-500 uppercase mt-2 ">Trending</span>{" "}
        <span className="text-gray-900 uppercase mt-2">Product</span>
        </UnderlinedText>

      </MotionHeading>
   
      {/* <Collapse  > */}
        <Flex justify="center">
          <NavMenu setCategoryFilter={setCategoryFilter} />
        </Flex>
      {/* </Collapse> */}

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        mx="auto"
        marginTop={6}
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>

      <Flex justify="center" mt={8}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            variant={currentPage === index + 1 ? "solid" : "outline"}
            mx={1}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </Box>
  );
}

export default Product;
