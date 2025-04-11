import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
  Grid,
  GridItem,
  Heading,
  Image,
  IconButton,
  useToast,
  NumberInput,
  NumberInputField,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { options } from "../../../../shared/options";
import { useProductStore } from "../../../../store/productStore";
import { useFieldArray, useForm } from "react-hook-form";

const IMAGEKIT_CONFIG = {
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  uploadEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
};

function AddProduct() {
  const toast = useToast();
  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [selectedSubSubOption, setSelectedSubSubOption] = useState("");
  const { addProduct } = useProductStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleSubmit, register, reset, watch, control } = useForm({
    defaultValues: { colors: "" },
    specifications: [{ key: "", value: "" }],
  });
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const colors = watch("colors", []);
  const handleDeleteImage = (index) => {
    setSelectedImage((prev) => prev.filter((_, i) => i !== index));
    setThumbnails((prev) => prev.filter((_, i) => i !== index));
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const handleAddSize = () => {
    if (newSize && newQuantity > 0) {
      setSizes((prevSizes) => {
        const existingSizeIndex = prevSizes.findIndex(
          (item) => item.size === newSize
        );

        if (existingSizeIndex > -1) {
          const updatedSizes = [...prevSizes];
          updatedSizes[existingSizeIndex].quantity += newQuantity;
          return updatedSizes;
        } else {
          return [...prevSizes, { size: newSize, quantity: newQuantity }];
        }
      });

      setNewSize("");
      setNewQuantity(1);
    }
  };
  useEffect(() => {
    if (!selectedImage) return;

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // Cleanup memory leak
  }, [selectedImage]);

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const response = await fetch(IMAGEKIT_CONFIG.uploadEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Basic ${btoa(
            import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ":"
          )}`,
        },
      });

      const data = await response.json();
      if (data.url) {
        return {
          fullSize: data.url,
          thumbnail: `${data.url}?tr=w-200,h-200`, // Generate a thumbnail
        };
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Image upload failed!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return null;
    }
  }

  async function handleImageUpload(event) {
    const files = event.target.files;
    const uploadedImages = Array.from(files);

    const imagePromises = uploadedImages.map(
      async (file) => await uploadImage(file)
    );
    const uploadedImagesData = await Promise.all(imagePromises);

    const validImages = uploadedImagesData.filter((img) => img !== null);

    setImages((prev) => [...prev, ...validImages.map((img) => img.fullSize)]);
    setThumbnails((prev) => [
      ...prev,
      ...validImages.map((img) => img.thumbnail),
    ]);
  }

  async function onSubmit(data) {
    const colorsArray = data.colors.split(",").map((color) => color.trim());

    if (images.length === 0) {
      toast({
        title: "Please upload at least one image.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const productData = {
      ...data,
      category: selectedCategory,
      subcategory: selectedSubOption,
      nestedSubcategory: selectedSubSubOption,
      images,
      thumbnails,
      sizes,
      colors: colorsArray,
      createdAt: new Date(),
    };

    try {
      await addProduct(productData);
      toast({
        title: "Product Added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      reset();
      setImages([]);
      setThumbnails([]);
      setSizes([]);
      setSelectedCategory("");
      setSelectedSubOption("");
      setSelectedSubSubOption("");
    } catch (err) {
      console.error("Error Adding Product:", err);
      toast({
        title: err.message || "Error Adding Product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box p={8} bg="white" borderRadius="lg" boxShadow="lg">
      <Heading size="lg" mb={6}>
        Add Product
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
          <GridItem>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Product Code</FormLabel>
                <Input
                  placeholder="Enter product Code"
                  {...register("productCode", { required: true })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  placeholder="Enter product name"
                  {...register("productName", { required: true })}
                />
              </FormControl>

              <HStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Category</FormLabel>
                  <Select
                    placeholder="Select a category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setSelectedSubOption("");
                    }}
                  >
                    {options.map((category) => (
                      <option key={category.label} value={category.label}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired isDisabled={!selectedCategory}>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    placeholder="Select a subcategory"
                    value={selectedSubOption}
                    onChange={(e) => {
                      setSelectedSubOption(e.target.value);
                      setSelectedSubSubOption("");
                    }}
                  >
                    {options
                      .find((cat) => cat.label === selectedCategory)
                      ?.subOptions.map((sub) => (
                        <option key={sub.label} value={sub.label}>
                          {sub.label}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl isDisabled={!selectedSubOption}>
                  <FormLabel>Nested Subcategory</FormLabel>
                  <Select
                    placeholder="Select a nested subcategory"
                    value={selectedSubSubOption}
                    onChange={(e) => setSelectedSubSubOption(e.target.value)}
                  >
                    {options
                      .find((cat) => cat.label === selectedCategory)
                      ?.subOptions.find(
                        (sub) => sub.label === selectedSubOption
                      )
                      ?.sub.map((nested) => (
                        <option key={nested.label} value={nested.label}>
                          {nested.label}
                        </option>
                      ))}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Specifications</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      placeholder="Key (e.g., Fabric, brand)"
                      {...register(`specifications.${index}.key`)}
                    />
                    <Input
                      placeholder="Value (e.g., Silk, squadpark)"
                      {...register(`specifications.${index}.value`)}
                    />
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                    >
                      ✖
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ key: "", value: "" })}
                >
                  + Add Specification
                </Button>
              </FormControl>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Gender"
                  {...register("Gender")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Brand</FormLabel>

                <Input
                  placeholder="Enter brand "
                  type="text"
                  {...register("brand")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Fabric</FormLabel>

                <Input
                  placeholder="Enter Fabric "
                  type="text"
                  {...register("Fabric")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Product Colors</FormLabel>

                <Input
                  placeholder="Enter colors "
                  type="text"
                  {...register("colors")}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Discount (%)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter discount"
                  {...register("discount")}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <NumberInput min={0} precision={2}>
                  <NumberInputField {...register("price")} />
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Stock</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField {...register("stock")} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  {...register("description")}
                />
              </FormControl>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Upload Images</FormLabel>
                <HStack wrap="wrap" spacing={4}>
                  {thumbnails.map((thumbSrc, i) => (
                    <Box key={i} position="relative" w="80px" h="80px">
                      <Image
                        src={thumbSrc}
                        alt={`Thumbnail ${i}`}
                        w="full"
                        h="full"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        size="xs"
                        position="absolute"
                        top="2"
                        right="2"
                        bg="red.500"
                        color="white"
                        aria-label="Remove image"
                        onClick={() => handleDeleteImage(i)}
                      />
                    </Box>
                  ))}

                  <Button
                    as="label"
                    htmlFor="image-upload"
                    variant="outline"
                    leftIcon={<AddIcon />}
                  >
                    Upload
                    <Input
                      id="image-upload"
                      type="file"
                      display="none"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Size and Quantity</FormLabel>
                <HStack spacing={4}>
                  <Input
                    placeholder="Size"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                  <NumberInput
                    value={newQuantity}
                    onChange={(valueString) => setNewQuantity(valueString)}
                    min={1}
                  >
                    <NumberInputField />
                  </NumberInput>
                  <Button
                    colorScheme="teal"
                    onClick={handleAddSize}
                    leftIcon={<AddIcon />}
                  >
                    Add Size
                  </Button>
                </HStack>

                <Table variant="simple" mt={4}>
                  <Tbody>
                    {sizes.map((sizeObj, index) => (
                      <Tr key={index}>
                        <Td>{sizeObj.size}</Td>
                        <Td>{sizeObj.quantity}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </FormControl>

              <Button type="submit" colorScheme="blue" isFullWidth>
                Submit Product
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}

export default AddProduct;
