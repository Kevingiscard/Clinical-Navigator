import { renderToString } from "react-dom/server";
import "@/lib/i18n";
import App from "./App";

// Static prerender of the public home route for the private preview build.
// "@/lib/trpc" is aliased to an inert stub in static builds, so no provider
// stack is needed and no browser API is touched here.
export function render(url: string): string {
  return renderToString(<App ssrPath={url} />);
}
