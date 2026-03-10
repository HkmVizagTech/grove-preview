import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthApp from "./apps/AuthApp";
import MemberApp from "./apps/MemberApp";
import GuideApp from "./apps/GuideApp";
import AdminApp from "./apps/AdminApp";
import SecurityApp from "./apps/SecurityApp";

export const UserContext = React.createContext();

export default function App() {
  // Rehydrate user from localStorage so route guards survive navigation/refresh
  const [user, setUserRaw] = useState(() => {
    try {
      const stored = localStorage.getItem('folk_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const setUser = (u) => {
    setUserRaw(u);
    if (u) localStorage.setItem('folk_user', JSON.stringify(u));
    else localStorage.removeItem('folk_user');
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthApp />} />

          {/* Member */}
          <Route
            path="/app/*"
            element={
              user ? <MemberApp /> : <Navigate to="/login" replace />
            }
          />

          {/* Guide — guide, admin, head all allowed */}
          <Route
            path="/guide/*"
            element={
              user && ["guide", "admin", "head"].includes(user.role)
                ? <GuideApp />
                : user
                  ? <Navigate to="/app/home" replace />
                  : <Navigate to="/login" replace />
            }
          />

          {/* Admin — admin, head allowed */}
          <Route
            path="/admin/*"
            element={
              user && ["admin", "head"].includes(user.role)
                ? <AdminApp />
                : user
                  ? <Navigate to="/app/home" replace />
                  : <Navigate to="/login" replace />
            }
          />

          {/* Security */}
          <Route
            path="/security/*"
            element={
              user && ["security", "admin"].includes(user.role)
                ? <SecurityApp />
                : user
                  ? <Navigate to="/app/home" replace />
                  : <Navigate to="/login" replace />
            }
          />

          {/* Root redirect */}
          <Route
            path="*"
            element={
              <Navigate
                to={
                  !user
                    ? "/login"
                    : ["admin", "head"].includes(user.role)
                      ? "/admin/dashboard"
                      : user.role === "guide"
                        ? "/guide/console"
                        : user.role === "security"
                          ? "/security/scan"
                          : "/app/home"
                }
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
