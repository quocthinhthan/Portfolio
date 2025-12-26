"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";

// Chỉ còn Dark mode
type ThemeContextValue = {
  theme: "dark";
};

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark" });

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Luôn add class dark vào html
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}