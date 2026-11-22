import { useState } from "react";

const SOURCE = "https://www.ema.europa.eu/en/documents/scientific-guideline/ich-e9-r1-addendum-estimands-and-sensitivity-analysis-clinical-trials-guideline-statistical-principles-clinical-trials-step-5_en.pdf";
const lessons = [
  { name: "La question d'effet", label: "01 / Définir", title: "Un estimand, cinq dimensions à préciser.", intro: "Avant de calculer un effet, décrire exactement la question à laquelle l'étude doit répondre.", items: ["Traitements comparés", "Population concernée", "Variable mesurée", "Événements intercurrents", "Résumé à l'échelle de la population"], note: "Ces dimensions forment une question cohérente. Ce schéma ne choisit pas une stratégie statistique pour votre étude.", section: "A.3.1 à A.3.3", variant: "question" },
  { name: "Les événements", label: "02 / Anticiper", title: "Un arrêt de traitement ne dit pas tout.", intro: "Un événement après le début du traitement peut modifier l'interprétation ou l'existence de la mesure : il faut préciser comment la question d'effet le prend en compte.", items: ["Traitement commencé", "Événement intercurrent", "Question d'effet à préciser"], note: "Arrêt du traitement, traitement supplémentaire et décès ne sont pas interchangeables. Événement intercurrent et donnée manquante sont deux notions distinctes.", section: "A.3.1, A.3.2 et A.4", variant: "event" },
  { name: "La robustesse", label: "03 / Vérifier", title: "Changer les hypothèses, garder la même question.", intro: "Une analyse de sensibilité examine si l'estimation résiste à des écarts aux hypothèses, en restant centrée sur le même estimand.", items: ["Même estimand", "Hypothèses explicites", "Analyses de sensibilité"], note: "Une analyse visant une autre question n'est pas automatiquement une analyse de sensibilité. Distinguer les analyses supplémentaires.", section: "A.5.2.1 et A.5.3", variant: "robustness" },
];
const terms = [
  ["Estimand", "La description précise de l'effet de traitement visé, en lien avec la question de l'étude. Elle précise les traitements, la population, la variable, la gestion des événements intercurrents et le résumé à l'échelle de la population.", "A.3.1 à A.3.3"],
  ["Variable ou critère de jugement", "Ce qui sera mesuré chez chaque participant pour répondre à la question. Un critère seul ne définit pas tout l'estimand.", "A.3.3"],
  ["Événement intercurrent", "Événement survenant après le début du traitement et affectant l'interprétation ou l'existence des mesures associées à la question d'effet.", "A.3.1"],
  ["Analyse de sensibilité", "Analyse des écarts possibles aux hypothèses de l'estimateur principal, centrée sur le même estimand. Ce n'est pas simplement toute analyse qui donne un autre résultat.", "A.5.2.1"],
];

export function TrialIllustration({ variant = "question" }: { variant?: string }) {
  return <svg viewBox="0 0 560 400" className="cn-editorial-art" role="img" aria-label={variant === "event" ? "Représentation pédagogique d'un parcours avec un événement à prendre en compte" : variant === "robustness" ? "Deux chemins d'analyse reliés à une même question" : "Carnet de recherche, cartes de question et documents reliés"}>
    <rect x="12" y="12" width="536" height="376" rx="110" fill="#eee8da" />
    <ellipse cx="282" cy="345" rx="206" ry="19" fill="#d9d1be" />
    <path d="M73 93L260 62 293 297 107 323Z" fill="#c6ad86" stroke="#795d3b" strokeWidth="2" />
    <path d="M85 82L269 71 285 302 101 313Z" fill="#fffdf5" stroke="#b4a891" strokeWidth="2" />
    <path d="M105 126L232 118M109 152L222 144M113 178L236 170M117 253L245 245M120 275L213 269" stroke="#c2c9bc" strokeWidth="5" strokeLinecap="round" />
    <rect x="129" y="69" width="83" height="25" rx="6" fill="#315d52" />
    {variant === "event" ? <>
      <path d="M177 223L275 223 326 172 441 172" fill="none" stroke="#315d52" strokeWidth="5" strokeDasharray="7 7" />
      <circle cx="177" cy="223" r="15" fill="#315d52" /><path d="M274 203L294 223 274 243 254 223Z" fill="#b67a3e" stroke="#714a25" strokeWidth="2" />
      <rect x="327" y="113" width="153" height="113" rx="15" fill="#fffdf5" stroke="#315d52" strokeWidth="2" /><circle cx="403" cy="152" r="18" fill="#d7e4d9" /><path d="M373 190h61" stroke="#315d52" strokeWidth="5" strokeLinecap="round" />
    </> : variant === "robustness" ? <>
      <circle cx="207" cy="207" r="31" fill="#315d52" /><path d="M236 207C293 207 288 136 341 136M236 207C293 207 288 281 341 281" fill="none" stroke="#7c956f" strokeWidth="5" />
      {[100,247].map(y=><g key={y}><rect x="341" y={y} width="136" height="70" rx="13" fill="#fffdf5" stroke="#315d52" strokeWidth="2"/><path d={`M366 ${y+25}h83M366 ${y+44}h56`} stroke="#a8b7a0" strokeWidth="5" strokeLinecap="round" /></g>)}
    </> : <>
      <rect x="287" y="87" width="189" height="235" rx="16" fill="#315d52" stroke="#23483e" strokeWidth="2" transform="rotate(7 381 204)" />
      {[113,151,189,227,265].map((y,i)=><g key={y}><rect x="306" y={y} width="149" height="28" rx="5" fill={i===3 ? "#efd6ad" : "#f5f3e9"} /><circle cx="320" cy={y+14} r="5" fill="#688361"/><path d={`M337 ${y+14}h96`} stroke="#a3ad99" strokeWidth="4" strokeLinecap="round" /></g>)}
      <path d="M234 207L287 207" stroke="#b67a3e" strokeWidth="4" strokeDasharray="5 5" />
    </>}
    <path d="M465 293L482 286 497 326 480 333Z" fill="#b67a3e" stroke="#795d3b" strokeWidth="2" /><path d="M480 333L491 345 497 326" fill="#f5edd9" stroke="#795d3b" strokeWidth="2" />
    <circle cx="79" cy="67" r="10" fill="#91a683" /><circle cx="498" cy="85" r="6" fill="#b67a3e" />
  </svg>;
}

export function IllustratedPrimer() {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const lesson = lessons[active];
  return <section className="cn-primer" aria-labelledby="cn-primer-title">
    <p className="cn-draft-label">Brouillon pédagogique v0.1 · Préparé le 21/11/2026 · Revue scientifique requise avant publication</p><div className="cn-section-heading"><div><p className="cn-eyebrow">Le carnet méthodologique</p><h2 id="cn-primer-title">Comprendre avant de concevoir.</h2></div><p>Trois repères illustrés, à explorer à votre rythme. Aucun calcul ni conseil individualisé.</p></div>
    <div className="cn-lesson-picker" role="group" aria-label="Choisir un repère illustré">{lessons.map((item,i)=><button type="button" key={item.name} aria-pressed={active===i} aria-controls="cn-lesson-panel" onClick={()=>setActive(i)}><span>0{i+1}</span>{item.name}</button>)}</div>
    <div id="cn-lesson-panel" className="cn-lesson-panel" aria-live="polite">
      <div className="cn-lesson-visual"><TrialIllustration variant={lesson.variant} /><p>Illustration pédagogique originale, pas un résultat d'étude.</p></div>
      <div className="cn-lesson-copy"><p className="cn-eyebrow">{lesson.label}</p><h3>{lesson.title}</h3><p>{lesson.intro}</p><ol className="cn-dimension-list">{lesson.items.map((item,i)=><li key={item}><span>{i+1}</span>{item}</li>)}</ol><p className="cn-lesson-note">{lesson.note}</p><a href={SOURCE} target="_blank" rel="noreferrer">Source : ICH E9(R1), {lesson.section} <span aria-hidden="true">↗</span></a><p className="cn-source-date">Addendum final 2019, version EMA effective en 2020. Portée méthodologique, pas autorisation locale.</p></div>
    </div>
    <div className="cn-primer-bottom"><section aria-labelledby="cn-terms-title"><p className="cn-eyebrow">Les mots, sans détour</p><h3 id="cn-terms-title">Un terme, une explication.</h3><p>Ouvrez une définition pour voir sa portée et sa référence.</p><div className="cn-term-list">{terms.map(([name,text,section])=><details key={name}><summary>{name}<span aria-hidden="true">+</span></summary><p>{text}</p><a href={SOURCE} target="_blank" rel="noreferrer">ICH E9(R1), {section} ↗</a></details>)}</div></section>
    <section className="cn-comprehension" aria-labelledby="cn-check-title"><p className="cn-eyebrow">À vous de jouer</p><h3 id="cn-check-title">La même question ?</h3><p>Une analyse vise un autre estimand. Est-elle automatiquement une analyse de sensibilité de l'analyse principale ?</p><div className="cn-answer-buttons">{["Oui", "Non"].map((text,i)=><button type="button" key={text} aria-pressed={answer===i} onClick={()=>setAnswer(i)}>{text}</button>)}</div>{answer!==null && <div role="status" className="cn-answer-feedback"><strong>{answer===1 ? "Exact, la distinction compte." : "Pas automatiquement."}</strong><p>Une analyse de sensibilité reste centrée sur le même estimand et explore la robustesse aux hypothèses. Une autre question peut relever d'une analyse supplémentaire.</p><a href={SOURCE} target="_blank" rel="noreferrer">Relire A.5.2.1 et A.5.3 ↗</a></div>}<small>Exercice de compréhension, sans certification. Choix gardé seulement tant que cette page reste ouverte.</small></section></div>
  </section>;
}
