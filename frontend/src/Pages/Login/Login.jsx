import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuthStore } from "../../store/authStore";

import GoogleLogin from "../../Component/GoogleLogin/GoogleLogin";
import useCartStore from "../../store/cartStore";
import img from "../../assets/signup.jpg";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useCartStore();
  const toast = useToast();
  const { login, isLoading: loading } = useAuthStore();

  const handleLogin = async (data) => {
    try {
      const response = await login(data.email, data.password); // Now returns a response

      if (response && response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);

        toast({
          title: "Logged in successfully!",
          description: response.data.message || "Welcome back!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/");
      } else {
        throw new Error(response?.data?.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);

      toast({
        title: "Login failed",
        description: err.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
    >
      {/* Right Side: Login Form */}
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={8}
      >
        <Box w="full" maxW="500px">
          <Heading mb={4} textAlign="center" color="black">
            Welcome Back
          </Heading>
          <Text mb={8} textAlign="center" color="gray.600">
            Sign in or{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "underline", color: "red.400" }}
            >
              create an account
            </Link>
          </Text>

          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={errors.email} mb={4}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "pink.500" }}
                _hover={{ bg: "gray.50" }}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>

            <FormControl isInvalid={errors.password} mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                bg="gray.100"
                _focus={{ bg: "white", borderColor: "pink.500" }}
                _hover={{ bg: "gray.50" }}
              />
              {errors.password && (
                <Text color="red.500">{errors.password.message}</Text>
              )}
            </FormControl>

            <Button
              bg="black"
              color="white"
              _hover={{ bg: "gray.800" }}
              type="submit"
              width="full"
              mb={4}
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>

          <Text mb={4} textAlign="center">
            Or sign in with
          </Text>
          <HStack spacing={2} justify="center">
            <IconButton
              icon={<FaFacebook />}
              aria-label="Facebook"
              bg="white"
              border="1px solid gray"
            />
            <GoogleLogin />
            <IconButton
              icon={<FaTwitter />}
              aria-label="Twitter"
              bg="white"
              border="1px solid gray"
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
