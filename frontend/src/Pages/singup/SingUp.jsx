import React from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  IconButton,
  Text,
  useToast,
  Grid,
  Image,
  Stack,
} from "@chakra-ui/react";
import { FaFacebook,  FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/authStore";
import img from "../../assets/signup.jpg"
import GoogleLogin from "../../Component/GoogleLogin/GoogleLogin";


function SignUp() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const { signup, isLoading, } = useAuthStore();
  const handleFormSubmit = async (data) => {
    console.log("Signup Form Data:", data); // Debugging
  
    try {
      await signup(data); 
      localStorage.setItem("userEmail", data.email);
  
      // ✅ Show "Check your email" message
      toast({
        title: "Check your email",
        description: "A verification link has been sent to your email. Please verify your account.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
  
      navigate("/verify-email"); 
  
    } catch (error) {
      console.error("Signup Error:", error); // Log error for debugging
  
      const errorMessage =
        error.message === "User already exists"
          ? "This email is already associated with an account. Please log in."
          : error.message || "Something went wrong.";
      
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
  
      if (error.message === "User already exists") navigate("/login");
    }
  };
  

  
  

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const user = await loginWithGoogle();
  //     const userInfo = {
  //       email: user?.email,
  //       name: user?.displayName,
  //       photoURL: user?.photoURL,
  //       uid: user?.uid,
  //     };
  
  //     const response = await api.post("/auth/users", userInfo);
  //     console.log("API Response:", response.data);
  
  //     toast({
  //       title: "Signed in successfully!",
  //       description: "Welcome back!",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  
  //     navigate("/", { replace: true });
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error);
  //     toast({
  //       title: "Error signing in",
  //       description: error.message || "Something went wrong.",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };
  
  
  
  
  return (
   
    <Box minHeight="100vh" display="flex" flexDirection={{ base: "column", lg: "row" }}>
      
    

      {/* Right Side: Signup Form */}
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" p={8}>
        <Box w="full" maxW="500px">
          <Heading mb={4} textAlign="center" color="black">Create an Account</Heading>
          <Text mb={2} textAlign="center" color="gray.600">Join our community and start shopping!</Text>
          <Text mb={8} textAlign="center" color="gray.600">
            Already a member?{' '}
            <Link to="/signin" style={{ textDecoration: "underline", color: "blue" }}>
              Sign In
            </Link>
          </Text>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} mb={4}>
              <FormControl isInvalid={errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input type="text" placeholder="First Name" {...register("firstName", { required: "First Name is required" })} />
                {errors.firstName && <Text color="red.500">{errors.firstName.message}</Text>}
              </FormControl>
              <FormControl isInvalid={errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" placeholder="Last Name" {...register("lastName", { required: "Last Name is required" })} />
                {errors.lastName && <Text color="red.500">{errors.lastName.message}</Text>}
              </FormControl>
            </Grid>

            <FormControl isInvalid={errors.email} mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} />
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>

            <FormControl isInvalid={errors.password} mb={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>

            <Button bg="black" color="white" _hover={{ bg: "gray.800" }} type="submit" width="full" mb={4} isLoading={isLoading}>
              Sign Up
            </Button>
          </form>

          <Text mb={4} textAlign="center">Or sign up with</Text>
          <HStack spacing={2} justify="center">
            <IconButton icon={<FaFacebook />} aria-label="Facebook" bg="white" border="1px solid gray" />
            <GoogleLogin isSignUp={true} />
            <IconButton icon={<FaTwitter />} aria-label="Twitter" bg="white" border="1px solid gray" />
          </HStack>
        </Box>
      </Box>
    </Box>

  
  );
}

export default SignUp;
