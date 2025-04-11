import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      // State
      cartProduct: [],
      favoriteProduct: [],
      userEmail: null,
      totalAmt: { regular: 0 }, // Subtotal
      discount: 0, // Discount amount
      couponCode: "", // Applied coupon code
    
      // Setters
      setCartProduct: (newCartProduct) => set({ cartProduct: newCartProduct }),
      setCouponCode: (newCouponCode) => set({ couponCode: newCouponCode }),
      setDiscount: (newDiscount) => set({ discount: newDiscount }),
    
      // Calculate subtotal (automatically updates when cart changes)
      calculateSubtotal: () => {
        const subtotal = get().cartProduct.reduce((sum, product) => {
          const regularPrice = (product?.price || 0) * (product?.quantity || 0);
          return sum + regularPrice;
        }, 0);
    
        set({ totalAmt: { regular: subtotal } });
        return subtotal;
      },
    
      // Determine shipping amount
      calculateShipping: () => {
        const subtotal = get().totalAmt.regular;
        return subtotal >= 3000 ? 0 : 80;
      },
    
      // Apply Coupon Code
      applyCoupon: () => {
        const { couponCode, totalAmt } = get();
        const validCoupons = {
          SAVE50: 50, // Flat $50 discount
          Enamup20: 40, // Flat $40 discount
          BLACKFRIDAY: totalAmt.regular * 0.04, // 4% discount
        };
    
        const appliedDiscount = validCoupons[couponCode] || 0;
        set({ discount: appliedDiscount });
    
        if (!appliedDiscount) {
          alert("Invalid Coupon Code");
        }
      },
    
      // Calculate Final Order Total (Subtotal + Shipping - Discount)
      calculateOrderTotal: () => {
        const { totalAmt, discount } = get();
        const shippingAmt = totalAmt.regular >= 3000 ? 0 : 80;
        const finalTotal = totalAmt.regular + shippingAmt - discount;
    
        console.log("Final Order Total:", finalTotal);
        return finalTotal;
      },

      // Set user and load their cart and favorites from localStorage
      setUser: (email) => {
        localStorage.setItem("userEmail", email);

        const userCart = JSON.parse(
          localStorage.getItem(`cart-${email}`) || "[]"
        );
        const userFavorites = JSON.parse(
          localStorage.getItem(`favorites-${email}`) || "[]"
        );

        set({
          userEmail: email,
          cartProduct: userCart,
          favoriteProduct: userFavorites,
        });
      },

      // Add product to the cart
      addToCart: (product) => {
        set((state) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === product._id
          );
          const updatedCart = existingProduct
            ? state.cartProduct.map((p) =>
                p._id === product._id
                  ? { ...p, quantity: (p.quantity || 0) + 1 }
                  : p
              )
            : [...state.cartProduct, { ...product, quantity: 1 }];

          // Sync with localStorage
          localStorage.setItem(
            `cart-${state.userEmail}`,
            JSON.stringify(updatedCart)
          );
          return { cartProduct: updatedCart };
        });
      },

      decreaseQuantity: (productId) => {
        set((state) => {
          const updatedCart = state.cartProduct
            .map((p) =>
              p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0); // Remove product if quantity is 0

          localStorage.setItem(
            `cart-${state.userEmail}`,
            JSON.stringify(updatedCart)
          );
          return { cartProduct: updatedCart };
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const updatedCart = state.cartProduct.filter(
            (item) => item._id !== productId
          );
          localStorage.setItem(
            `cart-${state.userEmail}`,
            JSON.stringify(updatedCart)
          );
          return { cartProduct: updatedCart };
        });
      },

      resetCart: () => {
        set((state) => {
          localStorage.removeItem(`cart-${state.userEmail}`);
          return { cartProduct: [] };
        });
      },

      addToFavorite: (product) => {
        set((state) => {
          const isFavorite = state.favoriteProduct.some(
            (item) => item._id === product._id
          );
          const updatedFavorites = isFavorite
            ? state.favoriteProduct.filter((item) => item._id !== product._id)
            : [...state.favoriteProduct, { ...product }];

          localStorage.setItem(
            `favorites-${state.userEmail}`,
            JSON.stringify(updatedFavorites)
          );
          return { favoriteProduct: updatedFavorites };
        });
      },

      removeFromFavorite: (productId) => {
        set((state) => {
          const updatedFavorites = state.favoriteProduct.filter(
            (item) => item._id !== productId
          );
          localStorage.setItem(
            `favorites-${state.userEmail}`,
            JSON.stringify(updatedFavorites)
          );
          return { favoriteProduct: updatedFavorites };
        });
      },

      resetFavorite: () => {
        set((state) => {
          localStorage.removeItem(`favorites-${state.userEmail}`);
          return { favoriteProduct: [] };
        });
      },

      logoutUser: () => {
        set((state) => {
          localStorage.setItem(
            `cart-${state.userEmail}`,
            JSON.stringify(state.cartProduct)
          );
          localStorage.setItem(
            `favorites-${state.userEmail}`,
            JSON.stringify(state.favoriteProduct)
          );
          localStorage.removeItem("userEmail");
          return { cartProduct: [], userEmail: null, favoriteProduct: [] };
        });
      },
    }),
    {
      name: "cart-store", // 🔥 Zustand Persist: Saves to localStorage automatically
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
