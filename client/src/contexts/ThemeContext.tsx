import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";
interface ThemeContextType { theme: Theme; resolvedTheme: ResolvedTheme; setTheme: (theme: Theme) => void; toggleTheme: () => void; switchable: boolean; }
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
interface ThemeProviderProps { children: React.ReactNode; defaultTheme?: Theme; switchable?: boolean; }
function getSystemTheme(): ResolvedTheme { return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
export function ThemeProvider({ children, defaultTheme = "system", switchable = true }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => { if (typeof window === "undefined") return defaultTheme; return (localStorage.getItem("theme") as Theme) || defaultTheme; });
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme());
  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;
  const setTheme = (next: Theme) => { setThemeState(next); localStorage.setItem("theme", next); };
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener?.("change", listener);
    return () => media.removeEventListener?.("change", listener);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("dark", resolvedTheme === "dark"); document.documentElement.dataset.theme = theme; }, [resolvedTheme, theme]);
  const toggleTheme = useMemo(() => () => { if (!switchable) return; setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light"); }, [switchable, theme]);
  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme, switchable }}>{children}</ThemeContext.Provider>;
}
export function useTheme() { const context = useContext(ThemeContext); if (!context) throw new Error("useTheme must be used within ThemeProvider"); return context; }
