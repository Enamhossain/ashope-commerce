import React, { useMemo, useEffect, useState } from "react";
import {
  Flex,
  Grid,
  Spinner,
  Text,
  Box,
  Heading,
  Select,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/productStore";
import ProductCard from "./productCard";
import { useParams } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";


const ProductHighlightCard = () => {
  const { category, subcategory, nestedSubcategory } = useParams();
  const { fetchProducts, products, isLoading, error, totalProducts, setFilters } = useProductStore();

 

  const [sort, setSort] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product?.category) return false;
      if (category && product.category?.toLowerCase() !== category.toLowerCase()) return false;
      if (subcategory && product.subcategory?.toLowerCase() !== subcategory.toLowerCase()) return false;
      if (nestedSubcategory && product.nestedSubcategory?.toLowerCase() !== nestedSubcategory.toLowerCase()) return false;
      return true;
    });
  }, [products, category, subcategory, nestedSubcategory]);

  // Apply sorting
  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    switch (sort) {
      case "low-to-high":
        return sorted.sort((a, b) => a.price - b.price);
      case "high-to-low":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest-first":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return sorted;
    }
  }, [filteredProducts, sort]);

  // Apply pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  }, [sortedProducts, currentPage, productsPerPage]);

  useEffect(() => {
    if (category) {
      setFilters({
        category,
        subcategory: subcategory || "",
        nestedSubcategory: nestedSubcategory || "",
      });
    }
    fetchProducts();
  }, [category, subcategory, nestedSubcategory, fetchProducts, setFilters]);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="teal.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text fontSize="lg" color="red.500">
          Error: {error}
        </Text>
      </Flex>
    );
  }

  return (
    <div className="md:flex bg-gray-50">
       <FilterSidebar/>
      <Box as="main" flex="1" p={{ base: 4, md: 8 }} bg="gray.50">
        <Box mx="auto">
          {/* Breadcrumb */}
          <Heading as="h5" fontSize="md" mb={4} className="uppercase">
            <Breadcrumb spacing="4px" separator={<BreadcrumbSeparator>/</BreadcrumbSeparator>}>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" color="gray.500">{category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink to="" color="gray.500">{subcategory}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink color="gray.600" fontWeight="bold">{nestedSubcategory}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Heading>

          {/* Sorting */}
          <Flex justify="space-between" align="center" mb={8}>
            <Heading as="h1" fontSize={{ base: "lg", md: "2xl" }} fontWeight="semibold">
              New Arrivals
            </Heading>
            <Select
              placeholder="Sort by: Featured"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              w={{ base: "full", sm: "auto" }}
              maxW="200px"
              borderColor="gray.200"
              bg="white"
              rounded="lg"
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="newest-first">Newest First</option>
            </Select>
          </Flex>

          {/* Product Listing */}
          {paginatedProducts.length === 0 ? (
            <Flex justify="center" align="center" minH="50vh">
              <Text fontSize="xl" color="gray.500">No products found in this category.</Text>
            </Flex>
          ) : (
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={{ base: 3, md: 8 }}
            >
              {paginatedProducts.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} />
                </Box>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {Math.ceil(filteredProducts.length / productsPerPage) > 1 && (
            <Flex justify="center" mt={8}>
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                <Button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  variant={currentPage === index + 1 ? "solid" : "outline"}
                  mx={1}
                >
                  {index + 1}
                </Button>
              ))}
            </Flex>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ProductHighlightCard;
