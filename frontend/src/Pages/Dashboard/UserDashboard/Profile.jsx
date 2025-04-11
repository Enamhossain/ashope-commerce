import React, { useState } from "react";
import {
  Flex,
  Avatar,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
 
} from "@chakra-ui/react";

import { useAuthStore } from "../../../store/authStore";
import { useForm } from "react-hook-form";

import {
  MapPin,
  Plus,
  Edit,
  ShoppingBagIcon,
  Package2Icon,
  HeartCrackIcon,
  CreditCardIcon,
  User2,
} from "lucide-react";

const orders = [
  {
    id: "8524",
    status: "Shipped",
    date: "15 December 2022",
    items: [
      {
        name: "T-shirts with multiple colors",
        quantity: 2,
        price: "$25.98",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
      },
      {
        name: "Gaming Headset 320h Black",
        quantity: 2,
        price: "$339.90",
        image:
          "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300&h=300&fit=crop",
      },
      {
        name: "Apple Watch Series 4 Space Grey",
        quantity: 2,
        price: "$339.90",
        image:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
      },
    ],
    total: "$450",
    shippingFee: "$36",
  },
];

const Sidebar = ({ onClose }) => (
  <div className="bg-white shadow-lg h-screen p-6 sm:w-16 md:w-64">
    <h2 className="text-xl font-bold mb-8 hidden md:block">Account Main</h2>
    <nav className="space-y-4">
      {[
        { icon: <ShoppingBagIcon size={20} />, text: "New Orders" },
        { icon: <Package2Icon size={20} />, text: "Orders History" },
        { icon: <HeartCrackIcon size={20} />, text: "My Wishlist" },
        { icon: <CreditCardIcon size={20} />, text: "Transactions" },
        { icon: <User2 size={20} />, text: "Profile Setting" },
      
      ].map((item, index) => (
        <a
          key={index}
          href="#"
          className="flex items-center space-x-3 text-gray-600 hover:text-blue-600"
        >
          {item.icon}
          <span className="hidden md:block">{item.text}</span>
        </a>
      ))}
    </nav>
  </div>
);

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileImage, setProfileImage] = useState(user.photoURL || "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user.displayName,
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
    },
  });

  const onSubmit = (data) => {
    const updatedData = { ...data, photoURL: profileImage };
    updateProfile(user._id, updatedData);
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" flex bg-gray-50 ">
      {/* Sidebar for Large Screens */}
      <div className="">
        <Sidebar />
      </div>

      <main className="p-2  ">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <Avatar size="xl" name={user.displayName} src={user.photoURL} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">{user.displayName}</h1>
                  <button onClick={onOpen} className="text-blue-600">
                    <Edit size={20} />
                  </button>
                </div>
                <p className="text-gray-600">
                  {" "}
                  {user.email} Phone: +123456789098
                </p>
              </div>
            </div>

            {/* Addresses */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <MapPin className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-900">
                    United States, 3601 Old Capitol Trail, Unit A-7, Suite
                  </p>
                </div>
              </div>

              <button className="flex items-center text-blue-600 space-x-2">
                <Plus size={20} />
                <span>Add New Address</span>
              </button>
            </div>
          </div>
          {/* Edit Profile Modal */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <FormControl isInvalid={errors.displayName} mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...register("displayName", {
                        required: "Name is required",
                      })}
                      placeholder="Enter your name"
                    />
                    <FormErrorMessage>
                      {errors.displayName?.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Phone Number */}
                  <FormControl isInvalid={errors.phoneNumber} mb={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]{10,15}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      placeholder="Enter your phone number"
                    />
                    <FormErrorMessage>
                      {errors.phoneNumber?.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Profile Picture Upload */}
                  <FormControl mb={4}>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </FormControl>

                  {/* Profile Preview */}
                  {profileImage && (
                    <Flex justify="center" mb={4}>
                      <Avatar size="xl" src={profileImage} />
                    </Flex>
                  )}

                  <ModalFooter>
                    <Button colorScheme="blue" type="submit" mr={3}>
                      Save Changes
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          {/* Orders Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Your orders</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      Order ID: {order.id}
                    </p>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <div className="flex space-x-2">
  <button className="px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition">
    Cancel Order
  </button>
  <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
    Track Order
  </button>
</div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity}x ={" "}
                          <span className="font-medium">{item.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping Fee:</span>
                    <span className="font-medium">{order.shippingFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <span>Total Paid:</span>
                    <span className="text-blue-600">{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
