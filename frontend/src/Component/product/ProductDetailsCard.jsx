import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  Heading,
  Stack,
  Tooltip,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Avatar,
  ListIcon,
  Icon,
  Textarea,
} from "@chakra-ui/react";
import { CheckCircleIcon, ShoppingCart, Star, StarIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import useCartStore from "../../store/cartStore";
import CheckoutButton from "../Cart/CheckoutButton";
import { useForm } from "react-hook-form";
import FormattedPrice from "../Cart/FormattedPrice";

function ProductDetailsCard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const product = useLoaderData();
  const { addToCart } = useCartStore();
  const { products, reviewProduct, isLoading } = useProductStore();
console.log(products)
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const rating = watch("rating", 0); // Track rating changes
  const [zoomStyle, setZoomStyle] = useState({});
  const imageContainerRef = useRef(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const toast = useToast();
  useEffect(() => {
    if (product) {
      setLoading(false);

      setRelatedProducts(
        products.filter(
          (item) =>
            item.nestedSubcategory === product.nestedSubcategory &&
            item._id !== product._id
        )
      );
    } else {
      setError("Failed to load product data");
      setLoading(false);
    }
  }, [product, products]);

  const onSubmit = async (data) => {
    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    const reviewData = {
      ...data, // Include other form data (e.g., user name, review text)
      rating, // Add rating manually since it's not part of `useForm()`
    };

    await reviewProduct(product._id, reviewData);
    reset(); // Reset form fields
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }
    addToCart({ ...product, selectedSize });
    toast({
      title: `${product?.nestedSubcategory} added successfully!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error || !product) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Alert status="error">
          <AlertIcon />
          {error || "Product not found"}
        </Alert>
      </Flex>
    );
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)", // Adjust zoom level
    });
  };

  const resetZoom = () => {
    setZoomStyle({});
  };
  return (
    <Box minH="100vh" bg="white" py={8}>
      <Container maxW="container.xl">
        <Stack
          spacing={8}
          direction={{ base: "column", lg: "row" }}
          align={{ base: "center", lg: "start" }}
        >
          <Box w={{ base: "100%", lg: "70%" }}>
            <Box
              display="flex"
              gap={4}
              flexDirection={{ base: "column", md: "row" }}
              flexWrap="wrap"
            >
              {/* Thumbnail Images */}
              <Flex
                direction={{ base: "row", md: "column" }}
                spacing={4}
                flexShrink={0}
                overflowX={{ base: "auto", md: "visible" }}
                maxW={{ base: "100%", md: "unset" }}
              >
                {product?.images?.map((image, index) => (
                  <Box
                    key={index}
                    w="75px"
                    h="80px"
                    borderRadius="md"
                    overflow="hidden"
                    cursor="pointer"
                    border="2px solid"
                    flexShrink={0}
                    borderColor={
                      selectedImage === image ? "black" : "transparent"
                    }
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Flex>

              {/* Main Product Image with Mouse Move Zoom */}
              <Box
                flex={2}
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                ref={imageContainerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetZoom}
              >
                <Image
                  src={selectedImage}
                  alt="Main Product"
                  w="100%"
                  h="480px"
                  objectFit="cover"
                  transition="transform 0.2s ease-out"
                  style={zoomStyle}
                />
              </Box>
            </Box>
          </Box>
          {/* Right Section: Product Details */}
          <Box w={{ base: "100%", lg: "30%" }}>
            
           
            <Text color="black" fontSize="sm" fontWeight="semibold" mb={2}>
              {product.category}
            </Text>
            <Text color="black" fontSize="2xl" fontWeight="bold" mb={4}>
              {product.productName}
            </Text>
            <Text color="black" fontSize="md" fontWeight="semibold" mb={2}>
              Code: {product.productCode}
            </Text>
            <HStack spacing={2} mb={4}>
              <Flex>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < (product?.rating || 0) ? "#FFD701" : "none"}
                      stroke={
                        i < (product?.rating || 0) ? "#FFD700" : "#E2E8F0"
                      }
                    />
                  ))}
              </Flex>
              <Text color="gray.500">
                ({product?.rating?.toFixed(1) || 0} / 5)
              </Text>
            </HStack>

            {/* Pricing */}
            <HStack spacing={4} mb={6}>
            {product.discount && Number(product.discount) > 0 ? (
                  <>
                    {/* Original Price (Strikethrough) */}
                    <Text
                      color="gray.500"
                      textDecoration="line-through"
                      fontSize={["sm", "md"]}
                    >
                      <FormattedPrice amount={Number(product.price)} />
                    </Text>

                    {/* Discounted Price */}
                    <Text color="red.500" fontSize="lg" fontWeight="bold">
                      <FormattedPrice
                        amount={(
                          Number(product.price) *
                          (1 - Number(product.discount) / 100)
                        ).toFixed(2)}
                      />
                    </Text>
                  </>
                ) : (
                  /* If no discount, show regular price */
                  <Text color="black" fontSize="xl" fontWeight="bold">
                    <FormattedPrice amount={Number(product.price)} />
                  </Text>
                )}

            </HStack>

            <Text color="black" mb={2} fontWeight="bold">
              Available Colors:
            </Text>
            <Flex gap={2} mb={6} wrap="wrap">
              {Array.isArray(product?.colors) ? (
                product.colors.map((color) => (
                  <Tooltip key={color} label={color} hasArrow>
                    <Box
                      w="24px"
                      h="24px"
                      borderRadius="50%"
                      bg={color}
                      border="1px solid gray"
                      cursor="pointer"
                      transition="transform 0.2s"
                      _hover={{ transform: "scale(1.2)" }}
                    />
                  </Tooltip>
                ))
              ) : (
                <Text>No colors available</Text>
              )}
            </Flex>

            <Text color="black" fontWeight="bold" mb={2}>
              Available Sizes:
            </Text>
            <Flex gap={2} mb={6}>
              {product?.sizes?.map((sizeObj) => (
                <Text
                  key={sizeObj.size}
                  onClick={() => handleSizeSelect(sizeObj.size)}
                  bg={selectedSize === sizeObj.size ? "black" : "white"}
                  color={selectedSize === sizeObj.size ? "white" : "black"}
                  px={4}
                  py={1}
                  border="1px solid"
                  borderColor="gray.300"
                  borderRadius="md"
                  cursor="pointer"
                  transition="background 0.2s"
                  _hover={{ bg: "black", color: "white" }}
                >
                  {sizeObj.size}
                </Text>
              ))}
            </Flex>

            <Accordion allowToggle marginTop="10px" marginBottom={10}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Description
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="gray.600">{product.description}</Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Specifications
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {product.specifications ||
                  product.specifications.length > 0 ? (
                    <List spacing={2} color="gray.600">
                      {product?.specifications.map((spec, index) => (
                        <ListItem
                          key={index}
                          fontSize="sm"
                          display="flex"
                          alignItems="center"
                        >
                          <ListIcon as={CheckCircleIcon} color="green.400" />
                          <strong>{spec.key}:</strong> {spec.value}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Text color="gray.500">No specifications available.</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Exchange Policy
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text color="gray.600">
                    You can exchange items within **5 days** of delivery. The
                    item must be **unused**, in its **original packaging**, and
                    in the **same condition** as received. Exchange is subject
                    to availability.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <HStack spacing={4} mb={6}>
              <Button
                leftIcon={<ShoppingCart size={20} />}
                bg="black"
                color="white"
                size="lg"
                _hover={{ bg: "gray.800" }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <CheckoutButton text="Buy Now" />
            </HStack>
          </Box>
        </Stack>
        {/* review  */}

        <Box mt={12}>
          <Heading size="md" mb={4}>
            Customer Reviews
          </Heading>

          <VStack align="stretch" spacing={4}>
            {product?.reviews?.length > 0 ? (
              product.reviews.map((review, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  rounded="lg"
                  boxShadow="sm"
                >
                  <HStack>
                    <Avatar size="sm" name={review?.user} />
                    <Text fontWeight="bold">{review?.user || "Anonymous"}</Text>
                  </HStack>
                  <HStack mt={2}>
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <Icon
                          as={StarIcon}
                          key={i}
                          color={
                            i < (review?.rating || 0)
                              ? "yellow.400"
                              : "gray.300"
                          }
                        />
                      ))}
                  </HStack>
                  <Text mt={2} color="gray.600">
                    {review?.text || "No review text provided."}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="gray.500">
                No reviews yet. Be the first to review!
              </Text>
            )}
          </VStack>

          {/* Review Form */}
          <Box mt={8} p={4} borderWidth="1px" rounded="lg" boxShadow="sm">
            <Heading size="sm" mb={3}>
              Write a Review
            </Heading>

            <HStack mb={3}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Icon
                    as={StarIcon}
                    key={i}
                    color={i < rating ? "yellow.400" : "gray.300"}
                    cursor="pointer"
                    onClick={() => setValue("rating", i + 1)}
                  />
                ))}
            </HStack>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("user", { required: true })}
                placeholder="Your Name"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />

              <Textarea
                {...register("text", { required: true })}
                placeholder="Write your review..."
              />

              <Button
                type="submit"
                colorScheme="teal"
                mt={3}
                isLoading={isLoading}
              >
                Submit Review
              </Button>
            </form>
          </Box>
        </Box>

        {/* Related Products */}
        <Box mt={16}>
          <Heading size="md" mb={6}>
            You May Also Like
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((related) => (
                <Box
                  key={related.id}
                  boxShadow="md"
                  rounded="lg"
                  overflow="hidden"
                >
                  <Link to={`/products/productdetails/${related._id}`}>
                    <Image
                      src={related.images?.[0] || related.images}
                      alt={`Related product ${related.id}`}
                      w="full"
                      h="200px"
                      objectFit="cover"
                      cursor="pointer"
                      transition="transform 0.2s"
                      _hover={{ transform: "scale(1.05)" }}
                    />
                  </Link>
                </Box>
              ))
            ) : (
              <Text color="gray.500">No related products found</Text>
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}

export default ProductDetailsCard;
