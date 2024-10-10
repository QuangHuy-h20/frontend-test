import { useTheme } from "../contexts/ThemeContext";
import SunIcon from "../assets/sun.svg?react";
import MoonIcon from "../assets/moon.svg?react";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggleButton;
