import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";
import { signInWithPopup } from "firebase/auth";
import auth, { facebookProvider, googleProvider } from "../firebaseConfig";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
      isCheckingAuth: true,
      users: [],
      loading: false,
      token: localStorage.getItem("token") || null,
      fetchUsers: async () => {
        set({ loading: true, error: null });

        try {
          const response = await api.get("/auth/AllUsers");
          set({
            users: response.data.users || [], // ✅ Ensure users is always an array
            loading: false, // ✅ Reset loading after successful fetch
          });
        } catch (error) {
          set({
            error: error.response?.data?.message || error.message,
            loading: false,
          });
        }
      },

      updateProfile: async (userId, updatedData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await api.patch(
            `/auth/profile/${userId}`,
            updatedData
          );
          if (!response || !response.data) {
            console.error("❌ Invalid response:", response);
            return null;
          }

          // Update the store with new user data
          set((state) => ({
            user: { ...state.user, ...updatedData },
            isLoading: false,
          }));

          return response.data;
        } catch (error) {
          console.error(
            "🔥 Error updating profile:",
            error.response?.data || error.message
          );

          set({
            error: error.response?.data?.message || "Profile update failed",
            isLoading: false,
          });

          return null;
        }
      },

      updateUserRole: async (userId, role) => {
        try {
          console.log("🔵 Sending request to update role:", userId, role);
          console.log(localStorage.getItem("token"));

          const token = localStorage.getItem("token");

          if (!token) {
            console.error("❌ No auth token found. Please log in again.");
            alert("Session expired. Please log in again.");
            return null;
          }

          const response = await api.patch(
            `/auth/users/${userId}`,
            { role },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log("✅ Server response:", response.data);

          if (!response || !response.data) {
            console.error("❌ Invalid response:", response);
            return null;
          }

          set((state) => ({
            users: state.users.map((user) =>
              user._id === userId ? { ...user, role } : user
            ),
          }));

          return response.data;
        } catch (error) {
          console.error(
            "🔥 Error updating user role:",
            error.response?.data || error.message
          );
          return null;
        }
      },

      deleteUser: async (userId) => {
        try {
          console.log("Deleting user:", userId);
          await api.delete(`/auth/users/${userId}`);
          set((state) => ({
            users: state.users.filter((user) => user._id !== userId),
          }));
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const result = await signInWithPopup(auth, googleProvider);
          const { email, displayName: name, photoURL, uid } = result.user;

          const res = await api.post("/auth/googlesignin", {
            email,
            name,
            photoURL,
            uid,
          });

          const role = res.data?.user?.role || "user"; // Default to "user" if role is missing
          const updatedUser = { ...result.user, role };

          set({ user: updatedUser, isAuthenticated: true, isLoading: false });

          return updatedUser;
        } catch (error) {
          set({
            error: error?.message || "Google login failed",
            isLoading: false,
          });

          return {
            success: false,
            message: error?.message || "Google login failed",
          };
        }
      },

      loginWithFacebook: async () => {
        set({ isLoading: true, error: null });
        try {
          const result = await signInWithPopup(auth, facebookProvider);
          const user = result.user;
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      signup: async (data) => {
        set({ isLoading: true, error: null });

        try {
          // Send `data` directly instead of wrapping it inside another object
          const res = await api.post("/auth/sign-up", data);

          console.log("Signup Request Data:", data);
          console.log("Signup Response:", res.data);

          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
          });

          return res.data;
        } catch (err) {
          console.error("Signup Error:", err.response?.data || err.message);

          set({
            error: err.response?.data?.message || "Signup failed",
            isLoading: false,
          });

          throw err; // Rethrow error so it can be caught in `handleFormSubmit`
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          const res = await api.post("/auth/sign-in", { email, password });
          console.log("Login API Response:", res);
          localStorage.setItem("token", token);
          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
            token,
          });

          return res; // ✅ Return the response so handleLogin can use it
        } catch (err) {
          const errorMessage = err.response?.data?.message || "Login failed";

          set({
            error: errorMessage,
            isLoading: false,
          });

          throw new Error(errorMessage); // ✅ Properly throw the error for handleLogin
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await api.post("/auth/logout");
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch {
          set({ error: "Logout failed", isLoading: false });
        }
      },
      verifyEmail: async (verificationCode) => {
        set({ isLoading: true, error: null });

        try {
          const email = localStorage.getItem("userEmail"); // Retrieve email from localStorage

          if (!email) {
            throw new Error(
              "No email found in localStorage. Please sign up again."
            );
          }

          const res = await api.post("/auth/verify-email", {
            email,
            verificationPin: verificationCode, // Ensure this matches backend naming
          });

          console.log("Verify Email Response:", res.data);

          set({ user: res.data.user, isAuthenticated: true, isLoading: false });

          return res.data;
        } catch (err) {
          console.error(
            "Verify Email Error:",
            err.response?.data || err.message
          );

          set({
            error: err.response?.data?.error || "Verification failed",
            isLoading: false,
          });

          throw err; // Rethrow to catch in the frontend
        }
      },

      checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const res = await api.get("/auth/check-auth");
          console.log(res.data, "isCheckingAuth");
          set({
            user: res.data.user,
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
