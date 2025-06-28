import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore.js";
import { useEffect } from "react";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useCartStore } from "../stores/useCartStore.js";

function App() {
  const { user, checkAuth, checkingAuth} = useUserStore();
  const { getCartItems } = useCartStore();
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  useEffect(() => {
    getCartItems()
  }, [getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;
  
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-gray-900">
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(56,182,255,0.3)_0%,rgba(10,60,80,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div> 

      {/* Content (above gradient) */}
      <div className="relative z-50 pt-20">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to='/' />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route 
            path="/secret-dashboard" 
            element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} 
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;