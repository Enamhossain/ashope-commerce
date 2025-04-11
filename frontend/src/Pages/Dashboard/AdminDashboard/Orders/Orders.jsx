import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box); 

export default function Orders() {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      p={8}
      bg="gray.50"
      borderRadius="lg"
      shadow="sm"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={6} color="gray.700" textAlign={["center"]}>
        Orders
      </Text>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        <Outlet />
      </MotionBox>
    </MotionBox>
  );
}
