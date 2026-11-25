import { recordVisit } from "@/lib/localProgress";
import { useEffect } from "react";
import { useLocation } from "wouter";

// Garde les 8 dernières pages vues dans le navigateur (jamais envoyé). Sans effet côté serveur.
export function VisitTracker() {
  const [location] = useLocation();
  useEffect(() => { recordVisit(location.split(/[?#]/)[0]); }, [location]);
  return null;
}
