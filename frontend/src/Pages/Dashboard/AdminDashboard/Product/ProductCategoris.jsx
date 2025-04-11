import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,

} from "@chakra-ui/react";

import FilterSidebar  from "../../../../Component/product/FilterSidebar";
import { useProductStore } from "../../../../store/productStore";
import ProductCard from "../../../../Component/product/productCard";


function ProductCategoris() {
  const {products} = useProductStore();
  
  return (
    <Container maxW="container.x">
      <Heading fontSize="xl" color="white" mb={6}>
        Clothes
      </Heading>
      <Flex gap={8}>
        <Box w="250px">
          <FilterSidebar />
        </Box>
        <Grid templateColumns="repeat(3, 1fr)" gap={6} flex={1}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}

export default ProductCategoris;
