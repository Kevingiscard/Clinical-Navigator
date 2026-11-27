import { renderToString } from "react-dom/server";
import { prerender } from "react-dom/static";
import "@/lib/i18n";
import App from "./App";

// Static prerender of the public home route for the private preview build.
// "@/lib/trpc" is aliased to an inert stub in static builds, so no provider
// stack is needed and no browser API is touched here.
export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}

// Same tree, but waits for lazy route chunks (Suspense) so internal pages can be
// prerendered too. Used by scripts/prerender-home.mjs for a short list of routes.
export async function renderRoute(url: string): Promise<string> {
  const { prelude } = await prerender(<App ssrPath={url} />);
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}
