import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import ProtectedRoute from "../protectRoute";
import AdminLayout from "../../../layouts/AdminLayout";
import ErrorPage from "../../ErrorPage/ErrorPage";

// Lazy-loaded components
const Home = lazy(() => import("../../../Pages/Home/Home"));
const Login = lazy(() => import("../../../Pages/Login/Login"));
const SignUp = lazy(() => import("../../../Pages/singup/SingUp"));
const VerificationEmailPage = lazy(() => import("../../Authentication/VerificationEmailPage").then(module => ({ default: module.VerificationEmailPage })));
const DashboardOverview = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/DashboardOverview"));
const Payments = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Payments/Payments"));
const Settings = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Settings/Settings"));
const AddProduct = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Product/AddProduct"));
const ProductDetails = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Product/ProductDetails"));
const ProductCategoris = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Product/ProductCategoris"));
const Products = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Product/Products"));
const Transactions = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Payments/Transactions"));
const Refunds = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Payments/Refunds"));
const PaymentMethods = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Payments/PaymentMethods"));
const ProfileSettings = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Settings/ProfileSettings"));
const SecuritySettings = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Settings/SecuritySettings"));
const NotificationSettings = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Settings/NotificationSettings"));
const Orders = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Orders/Orders"));
const AllOrders = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Orders/AllOrders"));
const OrderDetails = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Orders/OrderDetails"));
const OrderTracking = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Orders/OrderTracking"));
const ProductDetailsCard = lazy(() => import("../../product/ProductDetailsCard"));
const ProductHighlightCard = lazy(() => import("../../product/ProductHighlightCard"));
const User = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/users/User"));
const Alluser = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/users/Alluser"));
const Cart = lazy(() => import("../../Cart/Cart"));
const Favorites = lazy(() => import("../../Favorites/Favorites"));
const Profile = lazy(() => import("../../../Pages/Dashboard/UserDashboard/Profile"));
const Interface = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Ui/Interface"));
const AddBanner = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Ui/Banner/AddBanner"));
const BannerList = lazy(() => import("../../../Pages/Dashboard/AdminDashboard/Ui/Banner/BannerList"));
const HelpCenter = lazy(() => import("../../../Pages/Customer-Support/Helpcenter"));
const ShippingInformation = lazy(() => import("../../../Pages/Customer-Support/ShippingInformation"));
const ReturnPolicy = lazy(() => import("../../../Pages/Customer-Support/ReturnPolicy"));
const CustomerSupport = lazy(() => import("../../../Pages/Customer-Support/CustomerSupport"));
const ContactUs = lazy(() => import("../../../Pages/QuickLinks/AboutUs"));
const TermsCondition = lazy(() => import("../../../Pages/QuickLinks/TermsCondition"));
const FAQ = lazy(() => import("../../../Pages/QuickLinks/FAQ"));
const CheckOuts = lazy(() => import("../../Cart/CheckOuts"));

const API_URL = import.meta.env.VITE_API_URL || "https://ashope-backend.onrender.com";

// Define routes
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, 
      {
        path: "/products/collection/:category/:subcategory/:nestedSubcategory?",
        element: <ProductHighlightCard />,
      },      
      {
        path: "/products/collection/:category",
        element: <ProductHighlightCard />,
      },      
      {
        path: "/products/productdetails/:id", 
        element: <ProductDetailsCard />,
        loader: ({ params }) =>
          fetch(`${API_URL}/api/products/productdetails/${params?.id}`),
    
      },
      {
        path:"/favorites",
        element:<Favorites/>
      },
      {
       path:"/Cart",
       element:<Cart/>
      },
      {
        path:"/contact-us",
        element:<ContactUs/>
      },
      {
        path:"/terms-condition",
        element:<TermsCondition/>
      },
      {
        path:"/FAQ",
        element:<FAQ/>
      },
      {
       path:"/help-center",
       element:<HelpCenter/>
      },
      {
       path:"/shipping-information",
       element:<ShippingInformation/>
      },
      {
       path:"/return-policy",
       element:<ReturnPolicy/>
      },
      {
       path:"/customer-support",
       element:<CustomerSupport/>
      },
       {
        path:"/checkout",
        element:<CheckOuts/>
       },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path: "signin",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "verify-email",
        element: <VerificationEmailPage />,
      },
    ],
  },

  {
    path: "dashboard",
    element: <ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute> ,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <DashboardOverview />,
      },
      {
        path:"ui",
        element:<Interface/>,
        children:[
          {path:"banners/add",element:<AddBanner/>},
          {path:"banners/details",element:<BannerList/>}
        ]
      },
      {
        path: "products",
        element: <Products />,
        children: [
          { path: "add", element: <AddProduct /> },
          { path: "details", element: <ProductDetails /> },
          { path: "categories", element: <ProductCategoris /> },
        ],
      },

      {
        path: "Users",
        element: <User />,
        children: [
          {path:"Userlist",element:<Alluser/>}
        ],   
      },

      {
        path: "Orders",
        element: <Orders />,
        children: [
          { path: "all", element: <AllOrders /> },
          { path: "details", element: <OrderDetails /> },
          { path: "tracking", element: <OrderTracking /> },
        ],
      },
      {
        path: "payments",
        element: <Payments />,
        children: [
          { path: "transactions", element: <Transactions /> },
          { path: "refunds", element: <Refunds /> },
          { path: "methods", element: <PaymentMethods /> },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          { path: "profile", element: <ProfileSettings /> },
          { path: "security", element: <SecuritySettings /> },
          { path: "notifications", element: <NotificationSettings /> },
        ],
      },
    ],
  },
]);
