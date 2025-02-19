import React, { useState, useEffect } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="theme-toggle-container">
      <input
        type="checkbox"
        id="theme-toggle"
        className="theme-switch"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label htmlFor="theme-toggle" className="theme-switch-label">
        <span className="theme-switch-inner">
          <span className="moon"></span>
          <span className="sun"></span>
          <span className="stars"></span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
