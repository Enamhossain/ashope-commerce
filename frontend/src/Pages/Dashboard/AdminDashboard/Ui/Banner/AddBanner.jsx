import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input, VStack, Image, Text, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import api from "../../../../../utils/api";



function AddBanner() {
  const { register, handleSubmit, reset } = useForm();
  const [banners, setBanners] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Store image preview URL
  const [loading, setLoading] = useState(false); // Prevent multiple submissions
  const toast = useToast();

  
  // ImageKit configuration
  const IMAGEKIT_CONFIG = {
    publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
    uploadEndpoint: "https://upload.imagekit.io/api/v1/files/upload"
  };
  // Cleanup the Object URL when the component unmounts or image changes
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
        headers: {
          Authorization: `Basic ${btoa(import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY + ":")}`, 
        },
        body: formData,
      });
  
      const data = await response.json();
      
      if (data.url) {
        return data.url;
      } else {
        throw new Error("Image upload failed");
      }
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

    setLoading(true); // Start loading

    try {
      const imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) {
        setLoading(false);
        return;
      }

      const res = await api.post("/banners", {
        title: data.title,
        subtitle: data.subtitle,
        image: imageUrl,
        order: banners.length + 1,
      });

      if (res.status === 201) {
        setBanners([...banners, res.data]);
        setSelectedImage(null);
        setImagePreview(null); // Clear preview
        reset();
        toast({ title: "Banner added!", status: "success", duration: 2000, isClosable: true });
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      toast({ title: "Error adding banner!", status: "error", duration: 2000, isClosable: true });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box p={6} maxW="500px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Manage Banners
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input {...register("title")} placeholder="Enter title" />
          </FormControl>

          <FormControl>
            <FormLabel>Subtitle</FormLabel>
            <Input {...register("subtitle")} placeholder="Enter subtitle" />
          </FormControl>

          <FormControl>
            <FormLabel>Upload Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedImage(file);
                }
              }}
            />
          </FormControl>

          {imagePreview && (
            <Image 
              src={imagePreview} 
              alt="Preview" 
              boxSize="200px" 
              objectFit="cover" 
              borderRadius="md"
              // Add ImageKit transformations if needed
              // src={`${imagePreview}?tr=w-300,h-200`}
            />
          )}

          <Button colorScheme="blue" type="submit" isLoading={loading}>
            Add Banner
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default AddBanner;
