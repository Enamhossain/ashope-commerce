import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaPinterest, FaInstagram } from "react-icons/fa";

import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link from React Router
import MenuProfile from "../Component/Header/MenuProfile";
import Authentication from "../Component/Authentication/Authentication";
import { useAuthStore } from "../store/authStore";
import {
  AlignLeft,
  ChevronDown,
  ChevronDownIcon,
  Heart,
  ShoppingCart,
} from "lucide-react"; // Import specific icons
import { options } from "./options";
import { useProductStore } from "../store/productStore";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import SearchResultCard from "../Component/product/SearchResultCard";
import useCartStore from "../store/cartStore";

export default function Navbar() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useProductStore();
  const { favoriteProduct, cartProduct } = useCartStore();
  const toast = useToast();
  const isLargeScreen = useBreakpointValue({ base: false, md: true });
  const { user, isCheckingAuth, logout, isLoading } = useAuthStore();
  useEffect(() => {
    const filtered = products.filter(
      (item) => item?.productName && item.productName.includes(searchText)
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  const handleLogout = async () => {
    try {
      await logout();
      useCartStore.getState().logoutUser();
      toast({
        title: "Logged out",
        description: "You have successfully logged out.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while logging out.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    console.log("Selected Language:", event.target.value);
  };
  return (
    <>
      <Box
        className="glass border-b border-white/5"
        p="2"
        color="white"
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="1400px"
          mx="auto"
          px="4"
          flexDirection={["column", "column", "row"]}
          gap="2"
        >
          <Flex gap="4" align="center">
            <Text fontSize="xs" fontWeight="medium" color="var(--text-muted)">squadparkclothing@gmail.com</Text>
            <Box w="1px" h="10px" bg="var(--surface-border)" />
            <Text fontSize="xs" fontWeight="medium" color="var(--text-muted)">+8801818-417242</Text>
          </Flex>
          <Flex
            gap="6"
            align="center"
          >
            <Flex gap="4" align="center" color="var(--text-muted)">
              <a href="https://facebook.com" className="hover:text-primary transition-colors"><FaFacebook /></a>
              <a href="https://instagram.com" className="hover:text-primary transition-colors"><FaInstagram /></a>
              <a href="https://pinterest.com" className="hover:text-primary transition-colors"><FaPinterest /></a>
            </Flex>
            <Flex gap="4" align="center">
              <Select
                value={language}
                onChange={handleLanguageChange}
                size="xs"
                variant="unstyled"
                width="70px"
                color="var(--text-muted)"
                _hover={{ color: 'white' }}
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="ar">العربية</option>
              </Select>
              <Box className="hidden md:block">
                <Authentication
                  handleLogout={handleLogout}
                  isCheckingAuth={isCheckingAuth}
                  user={user}
                  isLoading={isLoading}
                />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <div className="glass sticky top-0 z-50 border-b border-white/5 px-4 sm:px-6 lg:px-20 text-white">
        <Flex height="16" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="4">
            {isMobile && (
              <Button
                colorScheme="white"
                onClick={onOpen}
                variant="ghost"
                aria-label="Open Menu"
              >
                <AlignLeft size={24} />
              </Button>
            )}

            <Drawer
              placement="left"
              onClose={onClose}
              isOpen={isOpen}
              size="xs"
            >
              <DrawerOverlay backdropFilter="blur(4px)" />
              <DrawerContent bg="var(--background)" borderRight="1px solid" borderColor="var(--surface-border)">
                <DrawerHeader
                  borderBottomWidth="1px"
                  borderColor="var(--surface-border)"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={4}
                >
                  <Heading
                    size="md"
                    className="text-gradient"
                  >
                    <Link to="/">Squadpark</Link>
                  </Heading>
                  <Button onClick={onClose} fontSize="xl" variant="ghost" color="white">
                    &times;
                  </Button>
                </DrawerHeader>
                <DrawerBody px={4} py={6} color="white">
                  <Accordion allowToggle className="space-y-2">
                    {options.map((option, index) => (
                      <AccordionItem key={index} className="border-none">
                        <h2>
                          <AccordionButton className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5">
                            <Link
                              to={`/products/collection/${option.label.toLowerCase()}`}
                              className="flex items-center gap-2 font-medium"
                            >
                              {option.icon}
                              {option.label}
                            </Link>
                            {option.subOptions && (
                              <ChevronDown className="text-gray-500" />
                            )}
                          </AccordionButton>
                        </h2>

                        {option.subOptions && (
                          <AccordionPanel className="ml-4 space-y-1 border-l border-white/10 pl-3">
                            {option.subOptions.map((subOption, subIndex) => (
                              <Accordion allowToggle key={subIndex}>
                                <AccordionItem className="border-none">
                                  <h3>
                                    <AccordionButton className="flex justify-between items-center p-2 rounded-md hover:bg-white/5">
                                      <div className="flex items-center gap-2 text-sm text-gray-300">
                                        {subOption.icon}
                                        {subOption.label}
                                      </div>
                                      {subOption.sub && (
                                        <ChevronDown size={14} className="text-gray-500" />
                                      )}
                                    </AccordionButton>
                                  </h3>

                                  {subOption.sub && (
                                    <AccordionPanel className="ml-4 space-y-1 border-l border-white/5 pl-3">
                                      {subOption.sub.map(
                                        (nested, nestedIndex) => (
                                          <Link
                                            key={nestedIndex}
                                            to={`/products/collection/${option.label.toLowerCase()}/${subOption.label.toLowerCase()}/${
                                              nested.label
                                            }`}
                                            className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                                          >
                                            {nested.label}
                                          </Link>
                                        )
                                      )}
                                    </AccordionPanel>
                                  )}
                                </AccordionItem>
                              </Accordion>
                            ))}
                          </AccordionPanel>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </DrawerBody>
                <DrawerFooter
                  borderTopWidth="1px"
                  borderColor="var(--surface-border)"
                  justifyContent="center"
                  bg="var(--surface)"
                  py={4}
                >
                  <Flex gap={4}>
                    <Authentication />
                  </Flex>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>

          {/* Logo */}
          <Heading
            as="div"
            display={{ base: "none", md: "block" }}
            size="lg"
            className="text-gradient hover:scale-105 transition-transform duration-300"
          >
            <Link to="/">Squadpark</Link>
          </Heading>

          <div className="relative flex-1 max-w-md mx-8 hidden md:block">
            {/* Search Bar */}
            <div className="relative group">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              {searchText && (
                <IoClose
                  onClick={() => setSearchText("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer duration-200"
                />
              )}
            </div>

            {/* Search Results */}
            {searchText && (
              <Box
                className="glass mt-4 absolute w-full max-h-[70vh] overflow-y-auto rounded-2xl p-4 shadow-2xl border border-white/10"
                zIndex="20"
              >
                {filteredProducts.length > 0 ? (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    spacing={4}
                  >
                    {filteredProducts.map((product) => (
                      <SearchResultCard
                        key={product._id}
                        product={product}
                        setSearchText={setSearchText}
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Flex align="center" justify="center" p={10}>
                    <Text fontSize="lg" color="var(--text-muted)">
                      No matches for "{searchText}"
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </div>

          <Flex
            justifyContent="space-between"
            align="center"
            gap={6}
          >
            <MenuProfile
              isCheckingAuth={isCheckingAuth}
              handleLogout={handleLogout}
              user={user}
            />
            <Flex gap={5} align="center">
              <Link to="/cart" className="relative group">
                <ShoppingCart className="group-hover:text-primary transition-colors duration-200 cursor-pointer" size={22} />
                {cartProduct?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900">
                    {cartProduct.length}
                  </span>
                )}
              </Link>

              <Link to="/favorites" className="relative group">
                <Heart className="group-hover:text-secondary transition-colors duration-200 cursor-pointer" size={22} />
                {favoriteProduct?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-slate-900">
                    {favoriteProduct.length}
                  </span>
                )}
              </Link>
            </Flex>
          </Flex>
        </Flex>

        {/* Categories Bar */}
        <Box
          display={isLargeScreen ? "block" : "none"}
          maxW="1400px"
          mx="auto"
          className="border-t border-white/5"
        >
          <Flex h="12" align="center" justify="center" gap={12}>
            {options.map((option, index) => (
              <Box key={index} position="relative">
                {!option.subOptions ? (
                  <Link
                    to={`/products/collection/${option.label.toLowerCase()}`}
                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    {option.icon}
                    {option.label}
                  </Link>
                ) : (
                  <Popover trigger="hover" placement="bottom-start" gutter={12}>
                    <PopoverTrigger>
                      <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 outline-none">
                        {option.icon}
                        {option.label}
                        <ChevronDown size={14} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="glass !bg-slate-900/95 border-white/10 rounded-2xl shadow-2xl outline-none"
                      width="800px"
                      p={8}
                    >
                      <PopoverArrow bg="slate-900" />
                      <PopoverBody p={0}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={8}>
                          {option.subOptions.map((subOption, subIndex) => (
                            <Box key={subIndex}>
                              <Text
                                fontSize="xs"
                                fontWeight="bold"
                                color="primary"
                                className="text-primary mb-4 uppercase tracking-widest"
                              >
                                {subOption.label}
                              </Text>
                              <div className="flex flex-col gap-2">
                                {subOption.sub?.map((sub, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={`/products/collection/${option.label.toLowerCase()}/${subOption.label.toLowerCase()}/${sub.label}`}
                                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </Box>
                          ))}
                        </Grid>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                )}
              </Box>
            ))}
          </Flex>
        </Box>
      </div>

    </>
  );
}
