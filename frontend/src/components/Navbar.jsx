import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useCartStore } from "../../stores/useCartStore";
import { useEffect, useState } from "react";
import axios from "../../lib/axios.js";

const Navbar = () => {
	const { user, logout, checkAuth } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart, getCartItems } = useCartStore();

	useEffect(() => {
		getCartItems();
	}, [getCartItems]);

	return (
		<header className='fixed top-0 left-0 z-40 w-full transition-all duration-300 bg-gray-900 border-b shadow-lg bg-opacity-90 backdrop-blur-md border-sky-800'>
			<div className='container px-2 py-3 mx-4'>
				<div className='flex flex-wrap items-center justify-between'>
					<Link to='/' className='flex items-center space-x-2 text-2xl font-bold text-sky-400'>
						E-Commerce
					</Link>

					<nav className='flex flex-wrap items-center gap-6 mx-[-140px]'>
						
						
						{user && (
							<Link
								to={"/cart"}
								className='relative text-gray-300 transition duration-300 ease-in-out group hover:text-sky-400'
							>
								<ShoppingCart className='inline-block mr-1 group-hover:text-sky-400' size={26} />
								<span className='hidden sm:inline'>Cart</span>
								{cart.length > 0 && (
									<span
										className='absolute -top-3 -left-3 bg-sky-500 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-sky-400 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}
						{isAdmin && (
							<Link
								className='flex items-center px-2 py-2 font-medium text-white transition duration-300 ease-in-out rounded-md bg-sky-700 hover:bg-sky-600'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-2' size={20} />
								<span className='hidden sm:inline'>Dashboard</span>
							</Link>
						)}

						{user ? (
							<button
								className='flex items-center px-4 py-2 text-white transition duration-300 ease-in-out bg-gray-700 rounded-md hover:bg-gray-600'
								onClick={logout}
							>
								<LogOut size={22} />
								<span className='hidden ml-2 sm:inline'>Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className='flex items-center px-4 py-2 text-white transition duration-300 ease-in-out rounded-md bg-sky-600 hover:bg-sky-800'
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='flex items-center px-6 py-2 text-white transition duration-300 ease-in-out bg-gray-700 rounded-md hover:bg-gray-500'
								>
									<LogIn className='mr-2' size={22} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;