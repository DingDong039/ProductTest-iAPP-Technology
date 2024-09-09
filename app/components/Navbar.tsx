"use client";

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";
import { CartItem } from "../types";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  const handleCartClick = () => {
    if (user) {
      setIsCartOpen(true);
    } else {
      router.push("/sign-in");
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, amount: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/address");
    }
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="text-lg font-bold">
          ProductTest iAPP Technology
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={handleCartClick}
                className="text-white flex items-center space-x-2 hover:text-gray-300"
              >
                <FaShoppingCart size={24} />
                <span className="hidden md:inline">Cart</span>
              </button>
              <span>{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignUp}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
              <button
                onClick={handleSignIn}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </nav>

      <ShoppingCart
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        isConfirmationOpen={false}
        confirmRemove={() => {}}
        cancelRemove={() => {}}
        itemToRemove={null}
        isOpen={isCartOpen}
        onClose={toggleCart}
      />
    </>
  );
};

export default Navbar;
