import React from "react";
import { Box } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <Box>
      {/* Header */}
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </Box>
  );
}

export default MainLayout;
