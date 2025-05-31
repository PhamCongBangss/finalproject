import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setUser } = useAuth();
  console.log(user);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const storedCart = localStorage.getItem(`cart_${user.username}`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user || cart.length === 0) return;
    localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
  }, [cart, user]);

  function addToCart(id, size, quantity) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100000);
    const itemId = `id-${timestamp}-${random}`;
    setCart((preCart) => {
      return [...preCart, { id, size, quantity, itemId }];
    });
  }

  function deleteItem(itemId) {
    setCart((prevCart) => prevCart.filter((item) => item.itemId !== itemId));
  }

  const updateQuantity = (itemId, num) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.itemId === itemId
          ? {
              ...item,
              quantity:
                num === -1 && item.quantity === 1 ? 1 : item.quantity + num,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  function buyProduct({ fullname, phone, address, note, cartItems }) {
    if (!user) return;
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const order = {
      id: `order-${Date.now()}`,
      fullname,
      phone,
      address,
      note,
      cartItems,
      createdAt: new Date().toISOString(),
    };

    const updatedUser = {
      ...user,
      cart: [...(user.cart || []), order],
    };

    const updatedAccounts = accounts.map((acc) =>
      acc.username === user.username ? updatedUser : acc
    );

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    localStorage.removeItem(`cart_${user.username}`);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        deleteItem,
        buyProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
