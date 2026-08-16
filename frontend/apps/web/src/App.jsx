import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OTP from './pages/OTP';
import ForgotPassword from './pages/ForgotPassword';
import BikeDetail from './pages/BikeDetail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import SOS from './pages/SOS';
import Referral from './pages/Referral';
import ShopRegistration from './pages/ShopRegistration';
import ShopProfile from './pages/ShopProfile';
import AddBike from './pages/AddBike';
import Notifications from './pages/Notifications';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChatScreen from './screens/Chat/ChatScreen';
import ChatList from './screens/Chat/ChatList';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* ✅ Auth routes - NO Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ✅ Protected routes - WITH Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bike/:id" element={<BikeDetail />} />
          <Route path="booking" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sos" element={<SOS />} />
          <Route path="referral" element={<Referral />} />
          <Route path="shop-register" element={<ShopRegistration />} />
          <Route path="shop-profile" element={<ShopProfile />} />
          <Route path="add-bike" element={<AddBike />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="chat" element={<ChatList />} />
          <Route path="chat/:chatId/:userId" element={<ChatScreen />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
