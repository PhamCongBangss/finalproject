import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
const API_URL = "http://127.0.0.1:3001/api/users";

export function AuthProvider({ children }) {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  // ✅ Login
  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.status === "success") {
        const token = res.data.token;
        localStorage.setItem("token", token); // Lưu token
        setUser(res.data.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return false;
    }
  };

  // ✅ Signup
  const signup = async (username, email, password, passwordConfirm) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username,
        email,
        password,
        passwordConfirm,
      });
      if (res.data.status === "success") {
        const token = res.data.token;
        localStorage.setItem("token", token); // Lưu token
        setUser(res.data.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err.response?.data || err.message);
      return false;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token"); // Xóa token
    setUser(null);
    navigate("/login");
  };

  // ✅ Check login (protected route)
  const checkLogin = async () => {
    setLoadingUser(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data.user);
    } catch (err) {
      console.log("Chưa đăng nhập hoặc token hết hạn");
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // ✅ Update profile (protected)
  const updateMe = async (updatedData, file) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Chưa đăng nhập");

    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (file) formData.append("avatar", file);

    const res = await axios.patch(`${API_URL}/updateMe`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setUser(res.data.data.user); // Cập nhật user trong context
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        login,
        signup,
        logout,
        checkLogin,
        updateMe,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
