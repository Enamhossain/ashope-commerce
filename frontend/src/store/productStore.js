import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";

export const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,
      totalProducts: 0,
      // Pagination
      currentPage: 1,
      productsPerPage: 10,
      filters: {
        category: "",
        subcategory: "",
        nestedSubcategory: "",
        size: [],
        fabrics: [],
        fit: "",
        pattern: "",
        colors: [],
        minPrice: 200,
        maxPrice: 3000,
      },

      // Actions
      setCurrentPage: (page) => {
        set({ currentPage: page });
        get().fetchProducts();
      },

      setProductsPerPage: (perPage) => {
        set({ productsPerPage: perPage, currentPage: 1 });
        get().fetchProducts();
      },

      // Set filters without fetching products immediately
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1, // Reset to first page when filters change
        })),

      // Apply all current filters and fetch products
      applyFilters: () => {
        set({ currentPage: 1 }); // Reset to first page when applying filters
        get().fetchProducts();
      },

      // Reset all filters to default values
      resetFilters: () => {
        set({
          filters: {
            category: "",
            subcategory: "",
            nestedSubcategory: "",
            size: [],
            fabrics: [],
            fit: "",
            pattern: "",
            colors: [],
            minPrice: 200,
            maxPrice: 3000,
          },
          currentPage: 1,
        });
        get().fetchProducts();
      },

      // Fetch products based on current filters and pagination
      fetchProducts: async () => {
        set({ isLoading: true, error: null });

        try {
          const { filters, currentPage, productsPerPage } = get();

          const params = new URLSearchParams();

          // Handle array filters correctly
          Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
              // For arrays, send multiple parameters with the same name
              value.forEach((item) => params.append(key, item));
            } else if (
              value !== "" &&
              value !== null &&
              value !== undefined &&
              // Only add price filters if they're different from defaults
              !(key === "minPrice" && value === 200) &&
              !(key === "maxPrice" && value === 3000)
            ) {
              params.append(key, value);
            }
          });

          // Add pagination parameters
          params.append("page", currentPage);
          params.append("limit", productsPerPage);

          const response = await api.get(
            `/products/collection?${params.toString()}`
          );

          if (!response.data || !Array.isArray(response.data.products)) {
            set({
              error: "Invalid response format from server.",
              isLoading: false,
            });
            return;
          }

          set({
            products: response.data.products,
            totalProducts: response.data.totalProducts,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error.message || "An unexpected error occurred.",
            isLoading: false,
          });
        }
      },

      addProduct: async (product) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post("/products/createproduct", product);
          const newProduct = res.data;
          set((state) => ({
            products: [...state.products, newProduct],
            isLoading: false,
          }));
          return newProduct;
        } catch (err) {
          const errorMessage =
            err.response?.data?.message || "Failed to add product";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage);
        }
      },

      updateProduct: async (id, updatedProduct) => {
        console.log("updateProduct called with:", id);
        if (!id) {
          console.error("updateProduct Error: Product ID is missing!");
          return null;
        }

        set({ isLoading: true, error: null });

        try {
          const res = await api.patch(
            `/products/editProduct/${id}`,
            updatedProduct
          );
          console.log(res.data);
          if (!res || !res.data) {
            throw new Error("Invalid response from server");
          }

          set((state) => ({
            products: state.products.map((product) =>
              product._id === id ? res.data.product : product
            ),
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update product",
            isLoading: false,
          });
        }
      },

      reviewProduct: async (id, review) => {
        set({ isLoading: true, error: null });
        try {
          const res = await api.post(`/products/review/${id}`, review);
          console.log(res.data);
          if (!res || !res.data) {
            throw new Error("Invalid response from server");
          }
          set((state) => ({
            products: state.products.map((product) =>
              product._id === id
                ? { ...product, reviews: res.data.reviews }
                : product
            ),
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to review product",
            isLoading: false,
          });
        }
      },

      deleteProduct: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await api.delete(`/products/deleted/${id}`);
          set((state) => ({
            products: state.products.filter((product) => product._id !== id), // ✅ Ensure string match
            isLoading: false,
          }));
        } catch (err) {
          console.error("Delete error:", err.response?.data?.message); // ✅ Log error details
          set({
            error: err.response?.data?.message || "Failed to delete product",
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    }
  )
);
