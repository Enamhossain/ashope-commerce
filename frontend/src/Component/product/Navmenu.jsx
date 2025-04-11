import React from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
const NavMenu = ({ setCategoryFilter }) => {
  return (
 
    <Tabs
      variant="enclosed"
      onChange={(index) => {
        const categories = ["All", "Panjabi", "T-Shirts"];
        setCategoryFilter(categories[index]);
      }}
    >
      <TabList>
        <Tab
          color="gray.800"
          fontWeight="medium"
          _hover={{ bg: "gray.800", color: "white" }}
        >
          ALL PRODUCTS
        </Tab>
        <Tab color="#636363" _hover={{ bg: "gray.800", color: "white" }}>
           Panjabi
        </Tab>
        <Tab color="#636363" _hover={{ bg: "gray.800", color: "white" }}>
          T-Shirts
        </Tab>
      </TabList>
    </Tabs>
  );
};

export default NavMenu;
