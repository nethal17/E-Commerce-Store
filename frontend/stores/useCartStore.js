import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},

	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
    
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

    getCartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({ cart: res.data });
            get().calculateTotals();

        } catch (error) {
            set({ cart: [] });
            //toast.error(error.response?.data?.error || "Failed to fetch cart items");
        }
    },

    addToCart: async (product) => {
        try {
            await axios.post("/cart", {productId: product._id});
            toast.success("Product added to cart");

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					  )
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();

        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to add product to cart");
        }
    },

    clearCart: async () => {
        try {
            await axios.delete("/cart/clear");
            console.log("Cart cleared successfully");

            set({ cart: [], coupon: null, total: 0, subtotal: 0 });
            get().calculateTotals();

        } catch (error) {
            console.log("Failed to clear cart", error);
        }
	},

    removeFromCart: async (productId) => {
        try {
            await axios.delete(`/cart`, { data: {productId} });
            toast.success("Product removed from cart");

            set((prevState) => ({
                cart: prevState.cart.filter((item) => item._id !== productId),
            }));
            get().calculateTotals();

        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to remove product from cart");
        }
    },

    updateQuantity: async (productId, quantity) => {
        try {
            if (quantity < 1) {
                await get().removeFromCart(productId);
                return;
            }

            await axios.put(`/cart/${productId}`, { quantity });
            toast.success("Cart updated successfully", { id: "quantity" });

            set((prevState) => ({
                cart: prevState.cart.map((item) =>
                    item._id === productId ? { ...item, quantity } : item
                ),
            }));
            get().calculateTotals();

        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to update cart");
        }
    },

    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100);
            total = total - discount;
        }

        set({ subtotal, total });
    },
}));