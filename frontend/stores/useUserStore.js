import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post("/auth/signup", {
                name,
                email,
                password
            });

            set({ user: res.data, loading: false });
            toast.success("Signup successful!");

        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Signup failed");
        }
    },

    login: async(email, password) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
            toast.success("Login successful!");


        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Login failed");
        }
    },

    logout: async() => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
            toast.success("Logout successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    checkAuth: async () => {
		set({ checkingAuth: true });

		try {
			const response = await axios.get("/auth/profile");
			set({ user: response.data, checkingAuth: false });
            
		} catch (error) {
			console.log(error.message);
			set({ checkingAuth: false, user: null });
		}
	},
}));