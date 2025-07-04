import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),

    createProduct: async (productData) => {
        set({ loading: true });

        try {
            const res = await axios.post("/products", productData);
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false
            }));
            toast.success("Product created successfully!");

        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true });

        try {
            const res = await axios.get("/products");
            set({ products: res.data.products, loading: false });
        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });
        }
    },

    fetchProductByCategory: async (category) => {
        set({ loading: true });

        try {
            const res = await axios.get(`/products/category/${category}`);
            set({ products: res.data.products, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to fetch products by category");
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true });

        try {
            await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false
            }));
            toast.success("Product deleted successfully!");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to delete the product");
        }
    },
    
    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });

        try {
            const res = await axios.patch(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: res.data.isFeatured } : product
                ),
                loading: false
            }));
            toast.success("Featured status updated!");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to feature the product");
        }
    },

    fetchFeaturedProducts: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/products/featured");
			set({ products: response.data, loading: false });
		} catch (error) {
			set({ error: "Failed to fetch products", loading: false });
			console.log("Error fetching featured products:", error);
		}
	},
}));