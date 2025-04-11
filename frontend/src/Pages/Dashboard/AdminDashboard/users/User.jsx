import React from "react";
import { Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
function User() {
  return (
    <VStack
      align="stretch"
      spacing={4}
      mt={0}
      bg="white"
      shadow="sm"
      rounded="md"
      textAlign={"center"}
      className="border border-gray-200"
    >
      <Outlet />
    </VStack>
  );
}

export default User;
