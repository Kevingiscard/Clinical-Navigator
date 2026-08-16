import { AlertTriangle, RotateCcw, ShieldCheck } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; recovering: boolean; }

class ErrorBoundary extends Component<Props, State> {
  private recoveryKey = "clinical-navigator-auto-recovery-v1";
  constructor(props: Props) { super(props); this.state = { hasError: false, error: null, recovering: false }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error, recovering: false }; }

  componentDidCatch(error: Error) {
    try {
      const payload = { message: error.message, stack: error.stack, route: window.location.pathname, at: new Date().toISOString() };
      const current = Number(localStorage.getItem("clinical-navigator-error-count") || "0");
      localStorage.setItem("clinical-navigator-error-count", String(current + 1));
      localStorage.setItem("clinical-navigator-last-error", JSON.stringify(payload));
      const alreadyRecovered = sessionStorage.getItem(this.recoveryKey) === "1";
      if (!alreadyRecovered) {
        sessionStorage.setItem(this.recoveryKey, "1");
        this.setState({ recovering: true });
        Promise.resolve().then(async () => {
          try { if ("serviceWorker" in navigator) { const regs = await navigator.serviceWorker.getRegistrations(); for (const reg of regs) await reg.unregister(); } } catch {}
          try { if ("caches" in window) { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); } } catch {}
          window.setTimeout(() => window.location.reload(), 250);
        });
      }
    } catch {}
  }

  render() {
    if (this.state.hasError) {
      if (this.state.recovering) return <div className="flex min-h-screen items-center justify-center bg-[#f5f8f7] p-8"><div className="max-w-md rounded-2xl border border-[#dbe8e3] bg-white p-8 text-center shadow-sm"><ShieldCheck className="mx-auto h-10 w-10 text-[#2c8271]"/><h1 className="mt-4 font-serif text-2xl font-bold text-[#0d2b36]">Récupération automatique…</h1><p className="mt-3 text-sm leading-6 text-[#607771]">Clinical Navigator nettoie le cache local et tente de redémarrer l’application. Aucune donnée patient n’est utilisée pour cette récupération.</p></div></div>;
      return <div className="flex min-h-screen items-center justify-center bg-[#f5f8f7] p-8"><div className="w-full max-w-2xl rounded-2xl border border-[#e7d6d1] bg-white p-8 shadow-sm"><AlertTriangle className="h-10 w-10 text-[#b45d4e]"/><h1 className="mt-4 font-serif text-3xl font-bold text-[#0d2b36]">Clinical Navigator est en mode récupération</h1><p className="mt-3 leading-7 text-[#5d736f]">Une erreur persistante a été détectée. Le site a déjà tenté une récupération automatique. Vous pouvez recharger la page ou consulter la page État du système.</p><details className="mt-5 rounded-xl bg-[#f6f9f8] p-4"><summary className="cursor-pointer text-sm font-bold text-[#2b4d4e]">Détail technique</summary><pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap text-xs text-[#5f746f]">{this.state.error?.stack || this.state.error?.message}</pre></details><div className="mt-5 flex flex-wrap gap-3"><button onClick={() => { sessionStorage.removeItem(this.recoveryKey); window.location.reload(); }} className="inline-flex items-center rounded-lg bg-[#0d2b36] px-4 py-2 text-sm font-bold text-white"><RotateCcw className="mr-2 h-4 w-4"/>Recharger</button><a href="/fr/systeme" className="inline-flex items-center rounded-lg border border-[#cbded7] px-4 py-2 text-sm font-bold text-[#244b4c]">État du système</a></div></div></div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
