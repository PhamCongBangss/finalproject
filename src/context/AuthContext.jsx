import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvt from "../../public/avtdefault.jpg";

const AuthContext = createContext();

const predefinedAccounts = [
  {
    username: "phamcongbang1234",
    password: "123456",
    email: "bangpham10062002",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const existingAccounts = localStorage.getItem("accounts");
    if (!existingAccounts) {
      localStorage.setItem("accounts", JSON.stringify(predefinedAccounts));
    }
  }, []);

  function login(username, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const found = accounts.find(
      (user) => user.username === username && user.password === password
    );
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function signup(email, username, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const existingUser = accounts.find((user) => user.username === username);

    if (existingUser || !validateEmail(email)) {
      return false;
    }

    const newUser = {
      username,
      password,
      email,
      fullname: "",
      phone: "",
      address: "",
      avatar: defaultAvt,
      cart: [],
    };
    const updatedAccounts = [...accounts, newUser];
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    return true;
  }

  function updateUser(updatedData) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const updatedAccounts = accounts.map((acc) =>
      acc.username === user.username ? { ...acc, ...updatedData } : acc
    );

    const updatedUser = { ...user, ...updatedData };

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, updateUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
