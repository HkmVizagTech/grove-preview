import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { C } from "./theme";
import AuthApp from "./apps/AuthApp";
import MemberApp from "./apps/MemberApp";
import GuideApp from "./apps/GuideApp";
import AdminApp from "./apps/AdminApp";
import SecurityApp from "./apps/SecurityApp";

// Mock User Context
export const UserContext = React.createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthApp />} />
          <Route path="/app/*" element={<RequireAuth role="member"><MemberApp /></RequireAuth>} />
          <Route path="/guide/*" element={<RequireAuth role="guide"><GuideApp /></RequireAuth>} />
          <Route path="/admin/*" element={<RequireAuth role="admin"><AdminApp /></RequireAuth>} />
          <Route path="/security/*" element={<RequireAuth role="security"><SecurityApp /></RequireAuth>} />
          <Route path="*" element={<Navigate to={user ? getDefaultRoute(user.role) : "/login"} replace />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function RequireAuth({ children, role }) {
  const { user } = React.useContext(UserContext);
  if (!user) return <Navigate to="/login" replace />;
  if (role === "admin" && !["admin", "head"].includes(user.role)) return <Navigate to="/login" replace />;
  if (role === "guide" && !["guide", "admin", "head"].includes(user.role)) return <Navigate to="/login" replace />;
  // Assuming all authed users can access member section, except specifically security
  // But let's just let it pass for the demo
  return children;
}

function getDefaultRoute(role) {
  if (["admin", "head"].includes(role)) return "/admin/dashboard";
  if (role === "guide") return "/guide/console";
  if (role === "security") return "/security/scan";
  return "/app/home";
}
