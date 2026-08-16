import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { SeoMeta } from "./components/SeoMeta";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Route, Switch } from "wouter";
const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const AdminCatalogPage = lazy(() => import("./pages/AdminCatalogPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const ExplorePage = lazy(() => import("./pages/ExplorePage"));
const Home = lazy(() => import("./pages/Home"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const LearningPage = lazy(() => import("./pages/LearningPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacySettingsPage = lazy(() => import("./pages/PrivacySettingsPage"));
const ProblemWizard = lazy(() => import("./pages/ProblemWizardStandalone"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const ResearchPage = lazy(() => import("./pages/ResearchPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));
const TrialDesignPage = lazy(() => import("./pages/TrialDesignStudio"));
const TrialDesignOperationsPage = lazy(() => import("./pages/TrialToolsLab"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const TrialAuditPage = lazy(() => import("./pages/TrialAuditPage"));
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));
const Sources = () => <InfoPage kind="sources" />; const Limits = () => <InfoPage kind="limits" />; const Privacy = () => <InfoPage kind="privacy" />; const Terms = () => <InfoPage kind="terms" />; const How = () => <InfoPage kind="how" />; const About = () => <InfoPage kind="about" />; const Contact = () => <InfoPage kind="contact" />; const Donate = () => <InfoPage kind="donate" />;
function Router() { return <Suspense fallback={<div className="min-h-screen bg-[#f5f8f7] p-8 text-[#49625f]">Chargement de Clinical Navigator…</div>}><Switch><Route path="/" component={Home} /><Route path="/fr/concevoir-un-essai/outils" component={TrialDesignOperationsPage} /><Route path="/fr/concevoir-un-essai" component={TrialDesignPage} /><Route path="/fr/auditer-un-essai" component={TrialAuditPage} /><Route path="/fr/probleme" component={ProblemWizard} /><Route path="/fr/explorer" component={ExplorePage} /><Route path="/fr/guides" component={ExplorePage} /><Route path="/fr/guides/:slug" component={ExplorePage} /><Route path="/fr/scenarios" component={ExplorePage} /><Route path="/fr/scenarios/:slug" component={ExplorePage} /><Route path="/fr/modules" component={ExplorePage} /><Route path="/fr/modules/:slug" component={ExplorePage} /><Route path="/fr/essais-complexes" component={ExplorePage} /><Route path="/fr/formation" component={LearningPage} /><Route path="/fr/ressources" component={ResourcesPage} /><Route path="/fr/veille" component={ResearchPage} /><Route path="/fr/systeme" component={MaintenancePage} /><Route path="/fr/outils" component={ToolsPage} /><Route path="/fr/mes-donnees" component={PrivacySettingsPage} /><Route path="/fr/mes-cas" component={AccountPage} /><Route path="/fr/favoris" component={AccountPage} /><Route path="/fr/mon-espace" component={AccountPage} /><Route path="/fr/admin/donnees" component={AdminAnalyticsPage} /><Route path="/fr/admin/catalogue" component={AdminCatalogPage} /><Route path="/fr/admin" component={AdminPage} /><Route path="/fr/sources" component={Sources} /><Route path="/fr/limites" component={Limits} /><Route path="/fr/confidentialite" component={Privacy} /><Route path="/fr/conditions" component={Terms} /><Route path="/fr/comment-ca-marche" component={How} /><Route path="/fr/a-propos" component={About} /><Route path="/fr/auteur" component={AuthorPage} /><Route path="/fr/contact" component={Contact} /><Route path="/fr/soutenir" component={Donate} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Suspense>; }
export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><SeoMeta /><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>; }
