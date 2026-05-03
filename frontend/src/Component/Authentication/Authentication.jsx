
import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";

const Authentication = ({handleLogout}) => {
  const { user, isLoading  } = useAuthStore();
  return (
    <Flex align="center" gap={4}>
      { user ? (
        <>
          <Text fontSize="lg" fontWeight="bold">
            Welcome, {user.name || user.displayName}
          </Text>
          <Button
            variant="outline"
            colorScheme="orange"
            leftIcon={<FaSignOutAlt />}
            onClick={handleLogout}
            isLoading={isLoading}
            borderColor="primary"
            color="primary"
            _hover={{ bg: "primary", color: "white" }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Button
              variant="solid"
              bg="white/10"
              color="white"
              leftIcon={<FaSignInAlt />}
              _hover={{ bg: "white/20" }}
              border="1px solid"
              borderColor="white/20"
              borderRadius="xl"
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button 
              bg="primary" 
              color="white" 
              _hover={{ bg: "orange.600", transform: "translateY(-2px)" }} 
              leftIcon={<FaUserPlus />}
              borderRadius="xl"
              transition="all 0.3s"
            >
              Sign up
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Authentication; 

