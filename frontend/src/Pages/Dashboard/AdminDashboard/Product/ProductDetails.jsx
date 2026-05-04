import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
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

  // Debounce search text
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product?.productName?.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [debouncedSearchText, products]);

  const transformProductData = React.useCallback((product) => ({
    id: product._id,
    name: product.productName,
    price: product.price,
    brand: product.brand,
    category: product.category,
    subcategory: product.subcategory,
    stock: product.stock,
    startDate: new Date(product.createdAt).toLocaleDateString(),
    image: product.images || "/placeholder.png",
  }), []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleOneDeletedProduct = async (id) => {
    try {
      await deleteProduct(id);
      toast({
        title: "Product Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="premium-card overflow-hidden">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Product Inventory</h2>
          <p className="text-xs text-gray-400">Manage and track your collection catalog</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
            <input
              type="text"
              placeholder="Filter products..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm w-full md:w-64 text-white"
            />
          </div>
          <Link to="../add">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-primary/20">
              <Plus size={18} />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <Flex justify="center" py={20}>
            <Spinner size="xl" color="primary" thickness="4px" />
          </Flex>
        ) : (
          <Table variant="unstyled" className="w-full">
            <Thead className="bg-white/5">
              <Tr>
                {["Product", "Brand", "Category", "Price", "Stock", "Date", "Actions"].map((header) => (
                  <Th key={header} className="!text-[10px] !font-bold !text-gray-500 !uppercase !tracking-widest !py-5 !px-8">
                    {header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => {
                const transformed = transformProductData(product);
                const isOutOfStock = transformed.stock === 0;
                const isLowStock = transformed.stock <= 10;

                return (
                  <Tr key={transformed.id} className="group hover:bg-white/5 transition-colors">
                    <Td className="!py-5 !px-8">
                      <Flex align="center" gap={4}>
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10">
                          <Image
                            src={transformed.image}
                            alt={transformed.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Text className="text-sm font-bold text-white leading-tight mb-1">{transformed.name}</Text>
                          <Text className="text-[10px] text-gray-500 font-mono">{transformed.id}</Text>
                        </div>
                      </Flex>
                    </Td>
                    <Td className="!py-5 !px-8 text-sm text-gray-400">{transformed.brand}</Td>
                    <Td className="!py-5 !px-8">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-2.5 py-1 rounded-md uppercase border border-indigo-400/20">
                        {transformed.subcategory}
                      </span>
                    </Td>
                    <Td className="!py-5 !px-8 text-sm font-bold text-white">
                      {transformed.price} BDT
                    </Td>
                    <Td className="!py-5 !px-8">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? "bg-red-500" : isLowStock ? "bg-amber-500" : "bg-emerald-500"}`} />
                        <Text className={`text-xs font-bold ${isOutOfStock ? "text-red-400" : isLowStock ? "text-amber-400" : "text-emerald-400"}`}>
                          {transformed.stock} left
                        </Text>
                      </div>
                    </Td>
                    <Td className="!py-5 !px-8 text-xs text-gray-500">{transformed.startDate}</Td>
                    <Td className="!py-5 !px-8">
                      <Flex gap={2}>
                        <button className="p-2 glass !bg-white/5 text-gray-400 hover:!text-white rounded-lg transition-all">
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditClick(product)}
                          className="p-2 glass !bg-white/5 text-gray-400 hover:!text-primary rounded-lg transition-all"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleOneDeletedProduct(transformed.id)}
                          className="p-2 glass !bg-white/5 text-gray-400 hover:!text-secondary rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </div>

      <div className="p-6 border-t border-white/5 flex items-center justify-between">
        <Text className="text-xs text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </Text>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 glass !bg-white/5 text-gray-400 text-xs rounded-lg hover:!bg-white/10 transition-all disabled:opacity-50" disabled>Previous</button>
          <button className="px-4 py-2 glass !bg-primary text-white text-xs rounded-lg hover:!bg-indigo-600 transition-all shadow-lg shadow-primary/20">1</button>
          <button className="px-4 py-2 glass !bg-white/5 text-gray-400 text-xs rounded-lg hover:!bg-white/10 transition-all">Next</button>
        </div>
      </div>

      <EditProductModal
        isOpen={isOpen}
        onClose={onClose}
        updateProduct={updateProduct}
        products={selectedProduct}
      />
    </div>
  );
};



export default ProductDetails;
