import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Apply theme to HTML root element for DaisyUI to work properly
  useEffect(() => {
    if (theme) {
      console.log("Applying theme to HTML:", theme);
      document.documentElement.setAttribute("data-theme", theme);
      document.body.setAttribute("data-theme", theme);
      // Force a re-render by toggling a class
      document.documentElement.classList.toggle("theme-changed");
      setTimeout(() => {
        document.documentElement.classList.toggle("theme-changed");
      }, 100);
    }
  }, [theme]);

  // Apply theme immediately on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("chat-theme") || "light";
    console.log("Initial theme from localStorage:", savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
    console.log("Initial theme applied to HTML:", savedTheme);
  }, []);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;