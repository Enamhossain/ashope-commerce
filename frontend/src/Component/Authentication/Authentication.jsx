
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
            colorScheme="red"
            leftIcon={<FaSignOutAlt />}
            onClick={handleLogout}
            isLoading={isLoading}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/signin">
            <Button
              variant="outline"
              leftIcon={<FaSignInAlt />}
              colorScheme="gray.100"
            >
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button bg="red.500" color="white" _hover={{ bg: "gray.800" }} leftIcon={<FaUserPlus />}>
              Sign up
            </Button>
          </Link>
        </>
      )}
    </Flex>
  );
};

export default Authentication; 

