import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../../Pages/singup/SingUp";
import Home from "../../../Pages/Home/Home";
import Login from "../../../Pages/Login/Login";
import MainLayout from "../../../layouts/MainLayout";
import { VerificationEmailPage } from "../../Authentication/VerificationEmailPage";
import ErrorPage from "../../ErrorPage/ErrorPage";
import DashboardOverview from "../../../Pages/Dashboard/AdminDashboard/DashboardOverview";
import Payments from "../../../Pages/Dashboard/AdminDashboard/Payments/Payments";

import Settings from "../../../Pages/Dashboard/AdminDashboard/Settings/Settings";
import AddProduct from "../../../Pages/Dashboard/AdminDashboard/Product/AddProduct";
import ProductDetails from "../../../Pages/Dashboard/AdminDashboard/Product/ProductDetails";
import ProductCategoris from "../../../Pages/Dashboard/AdminDashboard/Product/ProductCategoris";
import Products from "../../../Pages/Dashboard/AdminDashboard/Product/Products";
import Transactions from "../../../Pages/Dashboard/AdminDashboard/Payments/Transactions";
import Refunds from "../../../Pages/Dashboard/AdminDashboard/Payments/Refunds";
import PaymentMethods from "../../../Pages/Dashboard/AdminDashboard/Payments/PaymentMethods";
import ProfileSettings from "../../../Pages/Dashboard/AdminDashboard/Settings/ProfileSettings";
import SecuritySettings from "../../../Pages/Dashboard/AdminDashboard/Settings/SecuritySettings";
import NotificationSettings from "../../../Pages/Dashboard/AdminDashboard/Settings/NotificationSettings";
import AdminLayout from "../../../layouts/AdminLayout";
import Orders from "../../../Pages/Dashboard/AdminDashboard/Orders/Orders";
import AllOrders from "../../../Pages/Dashboard/AdminDashboard/Orders/AllOrders";
import OrderDetails from "../../../Pages/Dashboard/AdminDashboard/Orders/OrderDetails";
import OrderTracking from "../../../Pages/Dashboard/AdminDashboard/Orders/OrderTracking";
import ProductDetailsCard from "../../product/ProductDetailsCard";
import ProductHighlightCard from "../../product/ProductHighlightCard";
import User from "../../../Pages/Dashboard/AdminDashboard/users/User";
import Alluser from "../../../Pages/Dashboard/AdminDashboard/users/Alluser";
import Cart from "../../Cart/Cart";
import Favorites from "../../Favorites/Favorites";
import Profile from "../../../Pages/Dashboard/UserDashboard/Profile";
import ProtectedRoute from "../protectRoute";
import Interface from "../../../Pages/Dashboard/AdminDashboard/Ui/Interface";
import AddBanner from "../../../Pages/Dashboard/AdminDashboard/Ui/Banner/AddBanner";
import BannerList from "../../../Pages/Dashboard/AdminDashboard/Ui/Banner/BannerList";
import HelpCenter from "../../../Pages/Customer-Support/Helpcenter";
import ShippingInformation from "../../../Pages/Customer-Support/ShippingInformation";
import ReturnPolicy from "../../../Pages/Customer-Support/ReturnPolicy";
import CustomerSupport from "../../../Pages/Customer-Support/CustomerSupport";
import ContactUs from "../../../Pages/QuickLinks/AboutUs";
import TermsCondition from "../../../Pages/QuickLinks/TermsCondition";
import FAQ from "../../../Pages/QuickLinks/FAQ";
import CheckOuts from "../../Cart/CheckOuts";


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
      // {
      //   path: "/products/collection/:category/:subcategory",
      //   element: <ProductHighlightCard />,
      // },      
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
          fetch(`https://ashope-backend.onrender.com/api/products/productdetails/${params?.id}`),
    
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
          { path: "all", element: <AllOrders /> }, // Fixed "OverviewSales"
          { path: "details", element: <OrderDetails /> },
          { path: "tracking", element: <OrderTracking /> },
        ],
      },
      // {
      //   path: "analytics",
      //   element: <Analytics />,
      //   children: [
      //     { path: "sales", element: <OverviewSales /> }, // Fixed "OverviewSales"
      //     { path: "customers", element: <CustomerInsights /> },
      //     { path: "performance", element: <PerformanceMetrics /> },
      //   ],
      // },

      // {
      //   path: "coupons",
      //   element: <Coupons />,
      //   children: [
      //     { path: "create", element: <CreateCoupon /> },
      //     { path: "manage", element: <ManageCoupons /> },
      //   ],
      // },
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
