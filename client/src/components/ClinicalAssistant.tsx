import { AIChatBox, type Message } from "@/components/AIChatBox";
import { answerOffline } from "@/lib/offlineAI";
import { useEffect, useState } from "react";

export type ClinicalAssistantProps = {
  language?: "fr" | "en";
  onOnlineAnswer?: (question: string) => Promise<string>;
};

export function ClinicalAssistant({ language = "fr", onOnlineAnswer }: ClinicalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnline, setIsOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => { window.removeEventListener("online", online); window.removeEventListener("offline", offline); };
  }, []);

  const send = async (question: string) => {
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setIsLoading(true);
    try {
      const response = isOnline && onOnlineAnswer ? await Promise.race([
        onOnlineAnswer(question),
        new Promise<string>((_, reject) => window.setTimeout(() => reject(new Error("online-timeout")), 8000)),
      ]) : null;
      setMessages([...next, { role: "assistant", content: response ?? answerOffline(question, language).text }]);
    } catch {
      setMessages([...next, { role: "assistant", content: answerOffline(question, language).text }]);
    } finally {
      setIsLoading(false);
    }
  };

  return <section aria-label="Assistant clinique hors connexion" className="space-y-3">
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#dbe8e3] bg-[#f5faf7] px-4 py-3 text-sm text-[#365a55]">
      <span><strong>{isOnline ? "En ligne" : "Hors connexion"}</strong> · Les réponses peuvent utiliser le guide clinique embarqué.</span>
      <span className="rounded-full bg-[#e1f2e9] px-2 py-1 text-xs font-bold text-[#277968]">Pas de données patient</span>
    </div>
    <AIChatBox
      messages={messages}
      onSendMessage={send}
      isLoading={isLoading}
      height="520px"
      emptyStateMessage="Posez une question méthodologique générale."
      placeholder={language === "fr" ? "Ex. Quelle différence entre ITT et per-protocol ?" : "e.g. What is the difference between ITT and per-protocol?"}
      suggestedPrompts={language === "fr" ? ["Qu’est-ce qu’un estimand ?", "Comment choisir un endpoint primaire ?", "Que vérifier avant une soumission ?"] : ["What is an estimand?", "How should a primary endpoint be chosen?", "What should be checked before submission?"]}
    />
  </section>;
}
