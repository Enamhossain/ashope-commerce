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
        bg="gray.800"
        p="1"
        color="white"
        borderBottom="1px solid"
        borderColor="gray.500"
      >
        <Flex
          align="center"
          justify="space-between"
          ml={[0, 0, 10]} // No margin on mobile, margin on larger screens
          flexDirection={["column", "column", "row"]} // Column layout for mobile, row for desktop
          flexWrap={"wrap"}
        >
          <Flex gap="2" flexWrap={"wrap"} justifyContent={"center"}>
            <Text fontWeight="semibold">squadparkclothing@gmail.com</Text>
          
            <Text fontWeight="semibold">+8801818-417242</Text>
          </Flex>
          <Flex
            gap="5"
            align="center"
            justify="center"
            marginRight={[0, 0, 20]} // Remove margin on mobile
          >
            <Flex gap="3" align="center">
              <a
                href="https://www.facebook.com/Squadpark.clothings"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/Squadpark.clothings"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.pinterest.com/Squadpark.clothings"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest />
              </a>
            </Flex>
            <Flex gap="3" align="center">
              <Select
                value={language}
                onChange={handleLanguageChange}
                bg="gray.100"
                width="30"
                color="blackAlpha.900"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
                <option value="ar">العربية</option>
              </Select>
              <Link
                className="login hidden md:flex gap-2"
                textDecoration="none"
              >
                <Authentication
                  handleLogout={handleLogout}
                  isCheckingAuth={isCheckingAuth}
                  user={user}
                  isLoading={isLoading}
                />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <div className="bg-black px-4 sm:px-6 lg:px-20 text-white">
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
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader
                  borderBottomWidth="1px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={4}
                >
                  <Heading
                    size="md"
                    fontFamily="body" // Use "serif" for a premium look
                    fontWeight="bold"
                    color="gray.900"
                    _hover={{
                      color: "red.500", // Change text color on hover
                      textShadow: "sm", // Subtle shadow for effect
                      transition: "0.3s ease-in-out",
                    }}
                  >
                    <Link to="/">Squadpark</Link>
                  </Heading>
                  <Button onClick={onClose} fontSize="xl" variant="ghost">
                    &times;
                  </Button>
                </DrawerHeader>
                <DrawerBody px={4} py={6}>
                  <Accordion allowToggle className="space-y-2">
                    {options.map((option, index) => (
                      <AccordionItem key={index} className="border-none">
                        <h2>
                          <AccordionButton className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100">
                            <Link
                              to={`/products/collection/${option.label.toLowerCase()}`}
                              className="flex items-center gap-2 text-gray-800 font-medium"
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
                          <AccordionPanel className="ml-4 space-y-1 border-l border-gray-300 pl-3">
                            {option.subOptions.map((subOption, subIndex) => (
                              <Accordion allowToggle key={subIndex}>
                                <AccordionItem className="border-none">
                                  <h3>
                                    <AccordionButton className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                                        {subOption.icon}
                                        {subOption.label}
                                      </div>
                                      {subOption.sub && (
                                        <ChevronDown className="text-gray-500" />
                                      )}
                                    </AccordionButton>
                                  </h3>

                                  {subOption.sub && (
                                    <AccordionPanel className="ml-4 space-y-1 border-l border-gray-200 pl-3">
                                      {subOption.sub.map(
                                        (nested, nestedIndex) => (
                                          <Link
                                            key={nestedIndex}
                                            to={`/products/collection/${option.label.toLowerCase()}/${subOption.label.toLowerCase()}/${
                                              nested.label
                                            }`}
                                            className="block p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
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
                  justifyContent="center"
                  bg="gray.50"
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
            size={{ base: "sm", md: "xl", lg: "2xl" }}
            fontFamily="mono"
            fontWeight="bold"
            _hover={{
              color: "red.500", // Change text color on hover
              textShadow: "sm", // Subtle shadow for effect
              transition: "0.3s ease-in-out",
            }}
          >
            <Link to="/">Squadpark</Link>
          </Heading>

          <div className="relative w-52 md:w-full">
            {/* Search Bar */}
            <Flex gap={4} alignItems="end" w="100%" justifyContent="end">
              <Input
                variant="flushed"
                placeholder="Search"
                size="lg"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                focusBorderColor="gray.100"
                w="300px"
                h="40px"
                px={4}
              />
            </Flex>

            {/* Close/Search Icon */}
            {searchText ? (
              <IoClose
                onClick={() => setSearchText("")}
                className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
              />
            ) : (
              <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
            )}

            {/* Search Results */}
            {searchText && (
              <Box
                position="absolute"
                left="0"
                top="20"
                w="100%"
                maxH="500px"
                overflowY="scroll"
                bg="white"
                zIndex="20"
                boxShadow="lg"
                p={4}
                transition="max-height 0.3s ease-in-out"
                display={searchText ? "block" : "none"}
              >
                {filteredProducts.length > 0 ? (
                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
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
                    <Text fontSize="xl" color="gray.600">
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
            margin={["0.2rem", "0.5rem", "1.3rem", "2rem"]}
          >
            <MenuProfile
              isCheckingAuth={isCheckingAuth}
              handleLogout={handleLogout}
              user={user}
            />
            <Flex gap={4} align="center">
              <Link to="/cart">
                <div className="relative">
                  {
                    <ShoppingCart className="hover:text-skyText duration-200 cursor-pointer" />
                  }

                  {cartProduct?.length > 0 && (
                    <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
                      {cartProduct.length}
                    </span>
                  )}
                </div>
              </Link>

              <Link to="/favorites">
                <div className="relative">
                  {/* Favorite Icon */}
                  <Heart className="hover:text-skyText duration-200 cursor-pointer" />

                  {favoriteProduct?.length > 0 && (
                    <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
                      {favoriteProduct.length}
                    </span>
                  )}
                </div>
              </Link>
            </Flex>
          </Flex>
        </Flex>

        <Box
          display={isLargeScreen ? "block" : "none"}
          bg="black"
          px={{ base: 4, sm: 6, lg: 32 }}
          textColor="white"
          mx="10%"
        >
          <Flex h="16" align="center" justify="space-between" px={6}>
            <Flex align="center" justify="center" gap={{ base: 4, md: 8 }}>
              {options.map((option, index) => (
                <Box key={index} position="relative">
                  {!option.subOptions ? (
                    <Link
                      to={`/products/collection/${option.label.toLowerCase()}/${
                        option.label
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="link"
                        fontWeight="bold"
                        color="white"
                        leftIcon={option.icon}
                        _hover={{
                          color: "red.600",
                          transition: "color 0.3s ease-in-out",
                        }} // Use blue.600 or yellow.500 based on branding
                      >
                        {option.label}
                      </Button>
                    </Link>
                  ) : (
                    /* Multi-level Dropdown */
                    <Popover trigger="hover" placement="bottom-start">
                      <PopoverTrigger>
                        <Button
                          variant="link"
                          fontSize="lg"
                          fontWeight="medium"
                          color="white"
                          _hover={{
                            color: "red.600",
                            transition: "color 0.3s ease-in-out",
                          }} // Change to blue.600 or yellow.500 based on branding
                        >
                          <HStack spacing={2}>
                            {option.icon}
                            <Link
                              to={`/products/collection/${option.label.toLowerCase()}`}
                            >
                              {option.label}
                            </Link>
                          </HStack>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        bg="white"
                        shadow="lg"
                        width={{ base: "100%", md: "800px" }}
                        p={6}
                        zIndex={10}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Grid
                            templateColumns={{
                              base: "1fr",
                              md: "repeat(4, 1fr)",
                            }}
                            gap={4}
                          >
                            {option.subOptions.map((subOption, subIndex) => (
                              <Box key={subIndex}>
                                {/* Subcategory Label */}
                                {subOption.label && (
                                  <Text
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color="red.600" // Change to blue.600 or yellow.600 based on branding
                                    mb={3}
                                    textTransform="uppercase"
                                    letterSpacing="wide" // Adds a slight spacing for better readability
                                  >
                                    {subOption.label}
                                  </Text>
                                )}
                                {/* Nested Items */}
                                {subOption.sub && (
                                  <Box as="ul">
                                    {subOption.sub.map((sub, subIdx) => (
                                      <Box as="li" key={subIdx}>
                                        <Link
                                          to={`/products/collection/${option.label.toLowerCase()}/${subOption.label.toLowerCase()}/${
                                            sub.label
                                          }`}
                                          style={{ textDecoration: "none" }}
                                          aria-label={`View ${sub.label} products`}
                                        >
                                          <Flex
                                            alignItems="center"
                                            color="gray.600"
                                            border="1px solid transparent"
                                            _hover={{
                                              color: "red.600", // Change to blue.600 or yellow.600 based on branding
                                              borderColor: "red.300", // Subtle border effect on hover
                                              transition:
                                                "all 0.3s ease-in-out",
                                            }}
                                            p={2}
                                            borderRadius="md"
                                          >
                                            {sub.icon && (
                                              <Box mr={3}>{sub.icon}</Box>
                                            )}
                                            {sub.label}
                                          </Flex>
                                        </Link>
                                      </Box>
                                    ))}
                                  </Box>
                                )}
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
          </Flex>
        </Box>
      </div>
    </>
  );
}
