import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input, VStack, Image, Text, FormControl, FormLabel, useToast, Grid } from "@chakra-ui/react";
import api from "../../../../../utils/api";

function AddContent() {
  const { register, handleSubmit, reset } = useForm();
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.get("/categories");
        if (res.status === 200) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;
    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);

    try {
      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ":")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.url) return data.url;
      throw new Error("Image upload failed");
    } catch (error) {
      console.error(error);
      toast({ title: "Image upload failed!", status: "error", duration: 2000, isClosable: true });
      return null;
    }
  }

  const onSubmit = async (data) => {
    if (!selectedImage) {
      toast({ title: "Please upload an image!", status: "warning", duration: 2000, isClosable: true });
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
      const newCategory = { name: data.name, image: imageUrl };
      const res = await api.post("/categories", newCategory);
      if (res.status === 201) {
        setCategories([...categories, res.data]);
        setSelectedImage(null);
        setImagePreview(null);
        reset();
        toast({ title: "Category added!", status: "success", duration: 2000, isClosable: true });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast({ title: "Error adding category!", status: "error", duration: 2000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Manage Categories</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} placeholder="Enter category name" required />
          </FormControl>

          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
          </FormControl>

          {imagePreview && <Image src={imagePreview} alt="Preview" boxSize="200px" objectFit="cover" borderRadius="md" />}

          <Button colorScheme="blue" type="submit" isLoading={loading}>Add Category</Button>
        </VStack>
      </form>

      <Text fontSize="xl" fontWeight="bold" mt={6}>Existing Categories</Text>
      <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4} mt={4}>
        {categories.map((category) => (
          <Box key={category.id} p={2} borderWidth={1} borderRadius="md">
            <Image src={category.image} alt={category.name} boxSize="150px" objectFit="cover" borderRadius="md" />
            <Text fontSize="sm" fontWeight="bold" mt={2}>{category.name}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

export default AddContent;
