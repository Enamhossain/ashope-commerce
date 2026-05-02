import React from "react";
import { Box } from "@chakra-ui/react";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <Box className="min-h-screen relative overflow-hidden">
      <div className="bg-mesh"></div>
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}


export default MainLayout;
