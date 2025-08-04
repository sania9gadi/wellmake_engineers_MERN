/* DarkModeToggle.js
import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Update body class based on state
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px",
        borderRadius: "8px",
        background: isDark ? "#fff" : "#0a2f5c",
        color: isDark ? "#0a2f5c" : "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;

*/

// src/components/DarkModeToggle.js
import { useTheme } from "../context/ThemeContext";

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 16px",
        borderRadius: "8px",
        background: darkMode ? "#ffffff" : "#0a2f5c",
        color: darkMode ? "#0a2f5c" : "#ffffff",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "background 0.3s, color 0.3s"
      }}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;

