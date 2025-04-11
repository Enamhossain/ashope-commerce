import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  IconButton,
  Box,
  Grid,
  GridItem,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const EditProductModal = ({ isOpen, onClose, products, updateProduct }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: products || {},
  });

  useEffect(() => {
    if (products) {
      reset(products);
    }
  }, [products, reset]);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control, name: "images" });
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  // ✅ Submit Handler
  const handleUpdatedProduct = async (id, data) => {
    try {
      await updateProduct(id, data);
      toast({
        title: "Product Updated",
        description: "The product has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Update Failed",
        description: "Could not update the product. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleUpdatedProduct)}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel>Product Name</FormLabel>
                  <Input type="text" {...register("name")} />
                </FormControl>
              </GridItem>

              {/* Images */}
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Product Images</FormLabel>
                  <VStack spacing={2} align="start">
                    {imageFields.map((item, index) => (
                      <Box key={item.id} display="flex" gap={2}>
                        <Input
                          placeholder="Image URL"
                          {...register(`images.${index}`)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => removeImage(index)}
                        />
                      </Box>
                    ))}
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="teal"
                      size="sm"
                      onClick={() => appendImage("")}
                    >
                      Add Image
                    </Button>
                  </VStack>
                </FormControl>
              </GridItem>

              {/* Price */}
              <GridItem>
                <FormControl isInvalid={errors.price}>
                  <FormLabel>Price</FormLabel>
                  <Input type="number" {...register("price")} />
                </FormControl>
              </GridItem>

              {/* Stock */}
              <GridItem>
                <FormControl isInvalid={errors.stock}>
                  <FormLabel>Stock</FormLabel>
                  <Input type="number" {...register("stock")} />
                </FormControl>
              </GridItem>

              {/* Sizes */}
              <GridItem colSpan={2}>
                <FormControl>
                  <FormLabel>Sizes</FormLabel>
                  <VStack spacing={2} align="start">
                    {sizeFields.map((item, index) => (
                      <Box key={item.id} display="flex" gap={2}>
                        <Input
                          placeholder="Size (e.g. M, L, XL)"
                          {...register(`sizes.${index}.size`)}
                        />
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...register(`sizes.${index}.quantity`)}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          onClick={() => removeSize(index)}
                        />
                      </Box>
                    ))}
                    <Button
                      leftIcon={<AddIcon />}
                      colorScheme="teal"
                      size="sm"
                      onClick={() => appendSize({ size: "", quantity: "" })}
                    >
                      Add Size
                    </Button>
                  </VStack>
                </FormControl>
              </GridItem>
            </Grid>

            {/* Description */}
            <FormControl mt={4} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description")} />
            </FormControl>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
