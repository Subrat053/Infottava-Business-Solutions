import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("day");

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme === "night" ? "night" : "day";

    setTheme(initialTheme);
    
    // Apply initial theme class
    document.documentElement.classList.remove("day", "night");
    document.documentElement.classList.add(initialTheme);

    console.log("Initial theme loaded:", initialTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "day" ? "night" : "day";

      // Apply theme class immediately
      document.documentElement.classList.remove("day", "night");
      document.documentElement.classList.add(newTheme);

      // Save to localStorage
      localStorage.setItem("theme", newTheme);
      console.log("Theme toggled to:", newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
