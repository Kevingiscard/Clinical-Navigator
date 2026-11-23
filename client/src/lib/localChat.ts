// Assistant conversationnel local (WebLLM) : modele generaliste execute dans le
// navigateur via WebGPU. Aucune donnee de conversation n'est envoyee a un serveur
// par ce module ; le telechargement initial du modele se fait depuis le CDN du
// projet MLC/Hugging Face et reste ensuite dans le cache du navigateur.
// Le modele n'est PAS une expertise medicale validee : voir ClinicalAssistant
// pour les etiquettes affichees a l'utilisateur.

export const LOCAL_MODEL_ID = "Qwen2.5-3B-Instruct-q4f16_1-MLC";
export const LOCAL_MODEL_LABEL = "Qwen2.5 3B quantifié";

export type LocalChatProgress = { text: string; progress: number };

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

type EngineLike = {
  chat: { completions: { create: (req: { messages: ChatMessage[]; stream: boolean; temperature?: number; max_tokens?: number }) => Promise<AsyncIterable<{ choices: { delta?: { content?: string } }[] }>> } };
  resetChat: () => Promise<void>;
};

let enginePromise: Promise<EngineLike> | null = null;

export function localChatSupported(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

// La bibliotheque est chargee a la demande depuis un CDN (esm.sh, version epinglee)
// pour garder le site leger : elle n'est telechargee que si l'utilisateur active
// explicitement la conversation libre.
export const LOCAL_CHAT_LIB_URL = "https://esm.run/@mlc-ai/web-llm@0.2.89";

export async function loadLocalChatEngine(onProgress: (p: LocalChatProgress) => void): Promise<EngineLike> {
  if (!enginePromise) {
    enginePromise = (async () => {
      const webllm = await import(/* @vite-ignore */ LOCAL_CHAT_LIB_URL) as { CreateMLCEngine: (model: string, opts: { initProgressCallback: (r: { text: string; progress?: number }) => void }) => Promise<unknown> };
      const engine = await webllm.CreateMLCEngine(LOCAL_MODEL_ID, {
        initProgressCallback: report => onProgress({ text: report.text, progress: report.progress ?? 0 }),
      });
      return engine as unknown as EngineLike;
    })();
    enginePromise.catch(() => { enginePromise = null; });
  }
  return enginePromise;
}

export const LOCAL_SYSTEM_PROMPT = [
  "Tu es l'assistant conversationnel de Clinical Navigator, un site d'orientation en recherche clinique pour l'Afrique de l'Ouest et l'Europe.",
  "Tu reponds en francais clair et simple, sauf si la personne ecrit en anglais.",
  "Tu es un modele generaliste de petite taille : tu peux expliquer des concepts, aider a structurer une demarche, definir des termes.",
  "Tu n'es PAS un professionnel de sante ni un expert reglementaire : dis-le quand la question depasse la culture generale, et renvoie vers les ressources verifiees du site et les autorites competentes (CNERS, ABMed au Benin ; comites et autorites nationales en Europe).",
  "Ne donne jamais d'avis medical individuel, de diagnostic, de dosage, ni d'interpretation d'un dossier de patient : explique que le site ne traite aucune donnee de patient et invite a ne pas en saisir.",
  "Pour la reglementation, rappelle que les textes evoluent et qu'il faut verifier la version en vigueur a la source officielle.",
  "Si tu ne sais pas, dis-le franchement au lieu d'inventer.",
  "Reponds de facon concise : quelques paragraphes courts au maximum.",
].join(" ");

export async function* streamLocalReply(engine: EngineLike, history: ChatMessage[]): AsyncGenerator<string> {
  const stream = await engine.chat.completions.create({
    messages: [{ role: "system", content: LOCAL_SYSTEM_PROMPT }, ...history.slice(-12)],
    stream: true,
    temperature: 0.4,
    max_tokens: 600,
  });
  for await (const chunk of stream) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) yield delta;
  }
}
