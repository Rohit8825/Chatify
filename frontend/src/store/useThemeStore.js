import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("chat-theme") || "light",
  setTheme: (theme) => {
    console.log("useThemeStore: Setting theme to:", theme);
    console.log("useThemeStore: Previous theme was:", get().theme);
    
    localStorage.setItem("chat-theme", theme);
    set({ theme });
    
    // Immediately apply theme to HTML element
    console.log("useThemeStore: Applying theme to HTML:", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    
    // Verify the change
    setTimeout(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      console.log("useThemeStore: Verified HTML theme is now:", currentTheme);
    }, 50);
  },
}));