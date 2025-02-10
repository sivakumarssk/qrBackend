// src/RootApp.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Testimonials from "./components/Testimonials";
import Users from "./components/Users";
import Dashboard from "./components/DashBoard";
import CardsBackgroundImages from "./components/CardsBackground";
import PriceScreen from "./components/PriceScreen";
import Referrals from "./components/Referrals";
import Login from "./auth/SignIn";
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tokenadmin");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/users" element={<Users />} />
        <Route path="/cards" element={<CardsBackgroundImages />} />
        <Route path="/prices" element={<PriceScreen />} />
        <Route path="/referal" element={<Referrals />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
