import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy Loaded Components
const Header = lazy(() => import("../../Component/Header/Header"));
const Content = lazy(() => import("../../Component/content/Content"));
const Product = lazy(() => import("../../Component/product/Product"));
const GalleryComponent = lazy(() => import("../../Component/Gallery/GalleryComponent"));
const BlogHighlights = lazy(() => import("../../Component/Blog/Blog"));
const ContentCard = lazy(() => import("../../Component/content/ContentCard"));

// Tailwind Loader Component
const Loader = () => (
  <div className="flex items-center justify-center ">
    <div className="relative w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    <div className="absolute w-12 h-12 border-4 border-red-500 border-l-transparent rounded-full animate-spin-reverse"></div>
  </div>
);

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Custom Cursor (Optional) */}
      <motion.div id="" className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-200 ease-in-out"></motion.div>

      {/* Lazy Loaded Components */}
      <Suspense fallback={null}>
        <div className=" md:block hidden">
          <Header />
        </div>
      </Suspense>

      <Suspense fallback={null}>
        <div className="block md:hidden">
          <ContentCard />
        </div>
      </Suspense>

      <Suspense fallback={null}>
        <Content />
      </Suspense>

      <Suspense fallback={null}>
        <div className="">
          <Product />
        </div>
      </Suspense>

      <Suspense fallback={null}>
        <GalleryComponent />
      </Suspense>

      <Suspense fallback={null}>
        <BlogHighlights />
      </Suspense>
    </motion.div>
  );
}

export default Home;
