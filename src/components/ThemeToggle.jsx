"use client";

import { useEffect, useState } from "react";
import { FaArrowCircleUp, FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3">
      {/* Go to Top */}
      <button
        onClick={scrollToTop}
        className="btn btn-circle"
        title="Go to Top"
        aria-label="Go to top"
      >
        <FaArrowCircleUp />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="btn btn-circle"
        aria-label="Toggle theme"
        title="Toggle Theme"
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
}
