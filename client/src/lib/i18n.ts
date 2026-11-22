import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: { translation: {
    language: "Français", switchLanguage: "English", home: "Accueil", design: "Concevoir un essai", tools: "Outils avancés", audit: "Auditer un essai", problem: "J’ai un problème", explore: "Explorer", modules: "Modules", complex: "Essais complexes", training: "Formation", resources: "Ressources", research: "Veille", system: "État du système", author: "À propos du créateur",
  } },
  en: { translation: {
    language: "English", switchLanguage: "Français", home: "Home", design: "Design a trial", tools: "Advanced tools", audit: "Audit a trial", problem: "I have a problem", explore: "Explore", modules: "Modules", complex: "Complex trials", training: "Training", resources: "Resources", research: "Research", system: "System status", author: "About the creator",
  } },
} as const;

const stored = typeof window !== "undefined" ? window.localStorage.getItem("clinical-navigator-language") : null;
// Les pages sont rédigées en français : les libellés de navigation restent en français par défaut,
// la langue ne change que sur choix explicite (mémorisé) de l’utilisateur.
const browserLanguage = "fr";

void i18n.use(initReactI18next).init({
  resources,
  lng: stored === "en" || stored === "fr" ? stored : browserLanguage,
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
});

export function setLanguage(language: "fr" | "en") {
  void i18n.changeLanguage(language);
  if (typeof window !== "undefined") {
    window.localStorage.setItem("clinical-navigator-language", language);
    document.documentElement.lang = language;
  }
}

if (typeof document !== "undefined") document.documentElement.lang = i18n.language;

export default i18n;
