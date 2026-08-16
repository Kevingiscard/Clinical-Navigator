import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const next = i18n.language.startsWith("fr") ? "en" : "fr";
  return <button type="button" onClick={() => setLanguage(next)} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#cfe0da] px-3 py-2 text-xs font-bold text-[#294d4b] hover:bg-[#e7f3ed]" aria-label={`${t("switchLanguage")}`}><Languages className="h-4 w-4" aria-hidden="true" />{next === "en" ? "EN" : "FR"}</button>;
}
