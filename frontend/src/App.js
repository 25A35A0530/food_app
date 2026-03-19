import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/AdminOrders";
import OrderAnalytics from "./pages/OrderAnalytics";
import TrackOrder from "./pages/TrackOrder";
import ForgotPassword from "./pages/ForgotPassword";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
        <Route path="/analytics" element={<OrderAnalytics />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/order-details/:orderId" element={<OrderDetails/>}/>
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;