import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IThemeContext } from "./types";

const ThemeContext = createContext({} as IThemeContext);

export const ThemeProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-dark");
      const html = document.querySelector("html");
      if (html) {
        html.dataset.theme = `theme-dark`;
      }
    } else {
      setTheme("theme-light");
      localStorage.setItem("theme", "theme-light");
      const html = document.querySelector("html");
      if (html) {
        html.dataset.theme = `theme-light`;
      }
    }
  }, []);

  function toggleThemeMode() {
    if (theme === "theme-light") {
      setTheme("theme-dark");
      localStorage.setItem("theme", "theme-dark");
      const html = document.querySelector("html");

      if (html) {
        html.dataset.theme = `theme-dark`;
      }
    } else {
      setTheme("theme-light");
      localStorage.setItem("theme", "theme-light");
      const html = document.querySelector("html");

      if (html) {
        html.dataset.theme = `theme-light`;
      }
    }
  }

  const value = useMemo(() => {
    return {
      theme,
      toggleThemeMode,
    };
  }, [theme, toggleThemeMode]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
