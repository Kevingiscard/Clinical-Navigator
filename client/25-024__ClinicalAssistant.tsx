import { AIChatBox, type Message } from "@/components/AIChatBox";
import { LOCAL_MODEL_LABEL, loadLocalChatEngine, localChatSupported, streamLocalReply, type LocalChatProgress } from "@/lib/localChat";
import { answerOffline } from "@/lib/offlineAI";
import { STATIC_ONLY } from "@/lib/runtime";
import type { SitePageRef } from "@/lib/sitePages";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

export type ClinicalAssistantProps = {
  language?: "fr" | "en";
  onOnlineAnswer?: (question: string) => Promise<string>;
};

type LoadState = "idle" | "loading" | "ready" | "error";

export function ClinicalAssistant({ language = "fr", onOnlineAnswer }: ClinicalAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnline, setIsOnline] = useState(typeof navigator === "undefined" ? true : navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedPages, setSuggestedPages] = useState<SitePageRef[]>([]);
  const [mode, setMode] = useState<"guide" | "local">("guide");
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [progress, setProgress] = useState<LocalChatProgress>({ text: "", progress: 0 });
  const engineRef = useRef<Awaited<ReturnType<typeof loadLocalChatEngine>> | null>(null);
  const supported = localChatSupported();
  const localExperimentEnabled = import.meta.env.VITE_LOCAL_CHAT_EXPERIMENT === "true";

  useEffect(() => {
    const online = () => setIsOnline(true);
    const offline = () => setIsOnline(false);
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);
    return () => { window.removeEventListener("online", online); window.removeEventListener("offline", offline); };
  }, []);

  const activateLocal = async () => {
    setLoadState("loading");
    setProgress({ text: "Préparation…", progress: 0 });
    try {
      const engine = await loadLocalChatEngine(setProgress);
      engineRef.current = engine;
      setLoadState("ready");
      setMode("local");
    } catch {
      engineRef.current = null;
      setLoadState("error");
    }
  };

  const backToGuide = () => {
    setMode("guide");
    setMessages([]);
    setSuggestedPages([]);
  };

  const sendGuide = async (question: string, next: Message[]) => {
    const canAnswerOnline = isOnline && onOnlineAnswer && !STATIC_ONLY;
    if (!canAnswerOnline) {
      const offline = answerOffline(question, language);
      setMessages([...next, { role: "assistant", content: offline.text }]);
      setSuggestedPages(offline.pages);
      return;
    }
    try {
      const response = await Promise.race([
        onOnlineAnswer!(question),
        new Promise<string>((_, reject) => window.setTimeout(() => reject(new Error("online-timeout")), 8000)),
      ]);
      if (response) {
        setMessages([...next, { role: "assistant", content: response }]);
        setSuggestedPages([]);
      } else {
        const offline = answerOffline(question, language);
        setMessages([...next, { role: "assistant", content: offline.text }]);
        setSuggestedPages(offline.pages);
      }
    } catch {
      const offline = answerOffline(question, language);
      setMessages([...next, { role: "assistant", content: offline.text }]);
      setSuggestedPages(offline.pages);
    }
  };

  const sendLocal = async (question: string, next: Message[]) => {
    const engine = engineRef.current;
    if (!engine) { setLoadState("error"); return; }
    setMessages([...next, { role: "assistant", content: "" }]);
    try {
      let acc = "";
      const history = next.map(m => ({ role: m.role, content: m.content }));
      for await (const delta of streamLocalReply(engine, history)) {
        acc += delta;
        const text = acc;
        setMessages([...next, { role: "assistant", content: text }]);
      }
      if (!acc.trim()) {
        setMessages([...next, { role: "assistant", content: "Le modèle local n'a rien répondu. Reformulez, ou revenez au guide de ressources." }]);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "La conversation locale a rencontré une erreur sur cet appareil. Le guide de ressources reste disponible via le bouton « Revenir au guide »." }]);
    }
  };

  const send = async (question: string) => {
    const next = [...messages, { role: "user" as const, content: question }];
    setMessages(next);
    setIsLoading(true);
    try {
      if (mode === "local") await sendLocal(question, next);
      else await sendGuide(question, next);
    } finally {
      setIsLoading(false);
    }
  };

  return <section aria-label="Assistant clinique" className="space-y-3">
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#dbe8e3] bg-[#f5faf7] px-4 py-3 text-sm text-[#365a55]">
      <span>{mode === "local"
        ? <><strong>Conversation libre locale, expérimentale</strong> · Modèle généraliste sur cet appareil ; pas une expertise médicale validée.</>
        : <><strong>{STATIC_ONLY ? "Guide embarqué" : isOnline ? "En ligne" : "Hors connexion"}</strong> · {STATIC_ONLY ? "Réponses issues des ressources vérifiées du site ; ce n'est pas une IA générative." : "Les réponses peuvent utiliser le guide clinique embarqué."}</>}</span>
      <span className="rounded-full bg-[#e1f2e9] px-2 py-1 text-xs font-bold text-[#365f56]">Pas de données patient</span>
    </div>

    {mode === "guide" && (
      <div className="rounded-xl border border-dashed border-[#bcd6cd] bg-white p-4 text-sm text-[#365a55]">
        <p className="font-semibold text-[#0d2b36]">Conversation libre (option expérimentale)</p>
        {!localExperimentEnabled ? <p className="mt-1">Prototype non validé, activation suspendue pendant la revue qualité. Aucun modèle n’est téléchargé. Le guide documentaire reste disponible ci-dessous.</p> : supported ? <>
          <p className="mt-1">Un petit modèle généraliste ({LOCAL_MODEL_LABEL}) qui tourne sur cet appareil. Premier téléchargement lourd (~2 Go, une fois), ensuite la réflexion reste locale. Non validé médicalement : il peut se tromper. Ne saisissez aucune donnée de patient.</p>
          {loadState === "loading" ? (
            <div className="mt-3" role="status" aria-live="polite">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#e3efe9]">
                <div className="h-full rounded-full bg-[#277968] transition-all" style={{ width: `${Math.round(progress.progress * 100)}%` }} />
              </div>
              <p className="mt-1 text-xs text-[#365f56]">Téléchargement et chargement du modèle… {Math.round(progress.progress * 100)} % {progress.text ? `· ${progress.text.slice(0, 80)}` : ""}</p>
            </div>
          ) : (
            <button type="button" onClick={activateLocal} className="mt-3 rounded-lg border border-[#277968] px-3 py-2 text-sm font-semibold text-[#1c6659] transition hover:bg-[#e9f5ef]">
              {loadState === "error" ? "Réessayer l'activation" : "Activer la conversation libre (télécharge le modèle sur cet appareil)"}
            </button>
          )}
          {loadState === "error" && <p className="mt-2 text-xs text-[#9a3b3b]">Le chargement a échoué (réseau, mémoire ou navigateur). Le guide de ressources ci-dessous reste disponible.</p>}
        </> : (
          <p className="mt-1 text-xs text-[#365f56]">Non disponible sur ce navigateur ou cet appareil (WebGPU requis). Le guide de ressources ci-dessous reste disponible sans ce modèle.</p>
        )}
      </div>
    )}

    {mode === "local" && (
      <div className="flex justify-end">
        <button type="button" onClick={backToGuide} className="rounded-lg border border-[#bcd6cd] px-3 py-1.5 text-xs font-semibold text-[#365a55] transition hover:bg-[#eef6f2]">Revenir au guide de ressources</button>
      </div>
    )}

    <AIChatBox
      messages={messages}
      onSendMessage={send}
      isLoading={isLoading}
      height="520px"
      emptyStateMessage={mode === "local" ? "Conversation libre : posez votre question. Réponses généralistes, à vérifier — jamais de données de patient." : "Posez une question méthodologique générale."}
      placeholder={language === "fr" ? "Ex. Quelle différence entre ITT et per-protocol ?" : "e.g. What is the difference between ITT and per-protocol?"}
      suggestedPrompts={language === "fr" ? ["Qu’est-ce qu’un estimand ?", "Comment choisir un endpoint primaire ?", "Que vérifier avant une soumission ?"] : ["What is an estimand?", "How should a primary endpoint be chosen?", "What should be checked before submission?"]}
    />
    {mode === "guide" && suggestedPages.length > 0 && (
      <div className="rounded-xl border border-[#dbe8e3] bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#365f56]">Pages du site à consulter</p>
        <ul className="mt-2 space-y-2">
          {suggestedPages.map(page => (
            <li key={page.route}>
              <Link href={page.route} className="text-sm font-semibold text-[#1c6659] underline decoration-[#9fcdbf] underline-offset-2 hover:text-[#0d2b36]">{page.title}</Link>
              <span className="block text-xs text-[#365f56]">{page.description}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>;
}
