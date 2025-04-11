import {  IconButton, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = ({ isSignUp }) => {
    const toast = useToast();
    const navigate = useNavigate();
   const { loginWithGoogle } = useAuthStore();

   const handleGoogleSignIn = async () => {
    try {
      const loggedInUser = await loginWithGoogle();
      if (!loggedInUser) throw new Error("User data not received");
  
      navigate(loggedInUser.role === "admin" ? "/dashboard" : "/", { replace: true });
  
      toast({
        title: "Signed in successfully!",
        description: `Welcome back, ${loggedInUser.displayName || "User"}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
    } catch (error) {
      console.error("🔥 Google Sign-in Error:", error);
      
      toast({
        title: "Error signing in",
        description: error.response?.data?.message || error.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  
    return (
        <>
        <IconButton
        icon={<FaGoogle />}  // Google Icon
        onClick={handleGoogleSignIn}  // Trigger Google Sign-In
        bg="white"
        border="1px solid gray"
      />
      {/* Displaying Text */}
      <p>{isSignUp }</p>
        </>
    );
  };
  
  export default GoogleLogin;