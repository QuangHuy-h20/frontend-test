import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextProps = {
  isDarkMode: boolean;
  toggleTheme: () => void;
} | null;

export const ThemeContext = createContext<ThemeContextProps>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, toggleTheme] = useReducer((previous) => {
    localStorage.setItem("theme", JSON.stringify(!previous));
    return !previous;
  }, JSON.parse(localStorage.getItem("theme") as string) ?? true);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
