import React, { useState, useEffect } from "react";
import { Search, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useProductStore } from "../../../../store/productStore";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  Button,
  useDisclosure,
  Spinner,
  Flex,
  Card,
  CardBody,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import EditProductModal from "./EditModelProduct";

const ProductDetails = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchText, setSearchText] = useState(""); // ✅ Search input state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    fetchProducts,
    products,
    isLoading,
    error,
    deleteProduct,
    updateProduct,
  } = useProductStore();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    fetchProducts({ limit: entriesPerPage });
  }, [entriesPerPage, fetchProducts]);

  // ✅ Efficient Search Filtering
  useEffect(() => {
    const filtered = products.filter((product) =>
      product?.productName?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const transformProductData = (products) => ({
    id: products._id,
    name: products.productName,
    price: products.price,
    brand: products.brand,
    category: products.category,
    subcategory: products.subcategory,
    stock: products.stock,
    startDate: new Date(products.createdAt).toLocaleDateString(),
    image: products.images || "/placeholder.png",
  });

  const handleEditClick = (products) => {
  
    setSelectedProduct(products);
    onOpen(); // Open the modal
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value));
  };

  const handleOneDeletedProduct = async (id) => {
    try {
      await deleteProduct(id);
      console.log(id);
      toast({
        title: "Product Deleted",
        description: "The product has been successfully removed.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error.message || "Could not delete the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        {/* Entries per page selector */}
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-sm">Showing</span>
          <select
            className="border rounded-md text-sm px-2 py-1"
            value={entriesPerPage}
            onChange={handleEntriesChange}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span className="text-sm">entries</span>
        </div>

        {/* Search bar */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add new
          </button>
        </div>
      </div>

      <Box overflowX="auto" p={4}>
        {isLoading ? (
          <Flex justify="center" py={4}>
            <Spinner size="xl" />
          </Flex>
        ) : error ? (
          <Text color="red.500" textAlign="center" py={4}>
            Error loading products: {error}
          </Text>
        ) : isMobile ? (
          <Flex direction="column" gap={4}>
            {filteredProducts.map((product) => {
              const transformedProduct = transformProductData(product);
              return (
                <Card
                  key={transformedProduct.id}
                  p={4}
                  shadow="lg"
                  borderRadius="lg"
                >
                  <CardBody>
                    <Box display="flex" align="center" gap={4} flexWrap="wrap">
                      <Image
                        boxSize={{ base: "200px", md: "50px" }}
                        borderRadius="md"
                        src={transformedProduct.image}
                        alt={transformedProduct.name}
                      />
                      <Box
                        fontSize={{ base: "sm", md: "md" }}
                        fontFamily="Inter, sans-serif"
                      >
                        <Text fontWeight="medium">
                          Name: {transformedProduct.name}
                        </Text>
                        <Text>
                          ID: <b>{transformedProduct.id}</b>
                        </Text>
                        <Text>
                          Price: <b>{transformedProduct.price} BDT</b>
                        </Text>
                        <Text>Brand: {transformedProduct.brand}</Text>
                        <Text>Category: {transformedProduct.subcategory}</Text>
                        <Text>
                          Stock:{" "}
                          <Button
                            size="xs"
                            fontSize="sm"
                            fontWeight="bold"
                            colorScheme={
                              transformedProduct.stock === 0
                                ? "red"
                                : transformedProduct.stock <= 10
                                ? "yellow"
                                : "green"
                            }
                          >
                            {transformedProduct.stock}
                          </Button>
                        </Text>
                        <Text>Added Date: {transformedProduct.startDate}</Text>
                      </Box>
                    </Box>

                    <Flex mt={4} gap={2} flexWrap="wrap">
                      <Button size="sm" colorScheme="blue" variant="ghost">
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => handleEditClick(transformedProduct)}
                      >
                        <Pencil size={16} />
                      </Button>

                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() =>
                          handleOneDeletedProduct(transformedProduct.id)
                        }
                      >
                        <Trash2 size={16} />
                      </Button>
                    </Flex>
                  </CardBody>
                </Card>
              );
            })}
          </Flex>
        ) : (
          <Table variant="simple" size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                {[
                  "Product",
                  "Product ID",
                  "Price",
                  "Brand",
                  "Category",
                  "Stock",
                  "Added Date",
                  "Action",
                ].map((header) => (
                  <Th key={header}>{header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {filteredProducts.map((product) => {
                const transformedProduct = transformProductData(product);
                return (
                  <Tr key={transformedProduct.id} _hover={{ bg: "gray.100" }}>
                    <Td>
                      <Flex align="center">
                        <Image
                          boxSize="40px"
                          borderRadius="md"
                          src={transformedProduct.image}
                        />
                        <Text
                          ml={3}
                          fontSize="md"
                          fontFamily="Inter, sans-serif"
                          fontWeight="medium"
                        >
                          {transformedProduct.name}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Text fontSize="sm" fontFamily="Inter, sans-serif">
                        {transformedProduct.id}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" fontFamily="Inter, sans-serif">
                        {transformedProduct.price} BDT
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" fontFamily="Inter, sans-serif">
                        {transformedProduct.brand}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" fontFamily="Inter, sans-serif">
                        {transformedProduct.subcategory}
                      </Text>
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        fontSize="sm"
                        fontFamily="Inter, sans-serif"
                        colorScheme={
                          transformedProduct.stock === 0
                            ? "red"
                            : transformedProduct.stock <= 12
                            ? "yellow"
                            : "green"
                        }
                      >
                        {transformedProduct.stock}
                      </Button>
                    </Td>
                    <Td>
                      <Text fontSize="sm" fontFamily="Inter, sans-serif">
                        {transformedProduct.startDate}
                      </Text>
                    </Td>
                    <Td>
                      <Flex gap={2}>
                        <Button size="sm" colorScheme="blue" variant="ghost">
                          <Eye size={16} />
                        </Button>
                        <Button size="sm" colorScheme="green" onClick={onOpen}>
                          <Pencil size={16} />
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() =>
                            handleOneDeletedProduct(transformedProduct.id)
                          }
                        >
                          <Trash2 size={16} />
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
        {/* Edit Product Modal */}
        <EditProductModal
          isOpen={isOpen}
          onClose={onClose}
          updateProduct={updateProduct}
          products={selectedProduct}
        />
      </Box>
    </div>
  );
};

export default ProductDetails;
