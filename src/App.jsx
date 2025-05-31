import { Navigate, Route, Routes } from "react-router-dom";
import Champion from "./pages/Champion/Champion";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import ProfilePage from "./pages/Profile/Profile";
import MyAccount from "./pages/MyAccount/MyAccount";
import ChangePass from "./pages/ChangePass/ChangePass";
import Shop from "./pages/Shop/Shop";
import Area from "./pages/Area/Area";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout/Checkout";
import OrderHistory from "./pages/OrderHistory/OrderHistory";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/myaccount" element={<MyAccount />}>
              <Route index element={<ProfilePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="changepass" element={<ChangePass />} />
            </Route>
            <Route path="/" element={<Navigate to="/homepage" replace />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/champion" element={<Champion />} />
            <Route path="/area" element={<Area />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
