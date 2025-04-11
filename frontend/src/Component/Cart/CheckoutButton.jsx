import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const CheckoutButton = ({ text = "Proceed to Checkout" }) => {
  return (
    <Link to="/checkout">
      <Button colorScheme="blue" size="md" width="full">
        {text}
      </Button>
    </Link>
  );
};

export default CheckoutButton;
