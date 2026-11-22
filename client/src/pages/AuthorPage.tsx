import { ClinicalShell } from "@/components/ClinicalShell";
import portrait from "@/assets/author-portrait.webp";
import "@/styles/author-portrait.css";
const content = {
  "name": "Giscard Kevin HOUNSINOU",
  "intro": "De la faculté de médecine de Jiamusi à la coordination d'un essai multicentrique à Bordeaux, en passant par Cotonou : le parcours de Giscard Kevin HOUNSINOU, médecin et auteur de Clinical Navigator.",
  "alt": "Illustration : une boussole posée sur une carte stylisée de l'Afrique de l'Ouest, entourée d'une liste de contrôle, d'un stéthoscope, d'une loupe sur un dossier et d'un mortier.",
  "story": [
    "Tout commence à l'Université de Jiamusi, en Chine. Giscard Kevin HOUNSINOU y suit sa formation médicale : un bachelor de médecine et chirurgie en 2019, puis un master de médecine clinique, option oncologie, en 2022.",
    "De retour au Bénin, il met cette formation au service des soins palliatifs. Au CNHU-HKM de Cotonou, au département de médecine interne, il travaille en oncologie et en soins palliatifs, et forme les soignants à l'accompagnement psychologique des patients. D'août 2022 à janvier 2023, il est aussi chef de projet à ENABEL Bénin : coordination de l'équipe d'un projet de soins palliatifs et organisation du congrès des soins palliatifs 2022."
  ],
  "turn": [
    "En 2023, cap sur la France et la recherche clinique : un stage d'attaché de recherche clinique chez CLINACT, pendant lequel il monitore quatre essais cliniques, et une formation d'attaché de recherche clinique à Sup Santé la même année.",
    "De janvier 2024 à janvier 2026, l'Université de Bordeaux lui confie la coordination opérationnelle de l'étude GERONTE-FRONE : douze centres investigateurs en France, des partenaires en Irlande et aux Pays-Bas. Suivi des inclusions, saisie des données dans le eCRF (MACRO v4), suivi des événements indésirables graves : le quotidien concret d'un essai multicentrique."
  ],
  "stats": [
    [
      "12",
      "centres investigateurs coordonnés pour l'étude GERONTE-FRONE"
    ],
    [
      "4",
      "essais cliniques monitorés pendant son stage CLINACT"
    ],
    [
      "3",
      "pays engagés dans GERONTE-FRONE : France, Irlande, Pays-Bas"
    ],
    [
      "HSK 4",
      "niveau officiel de mandarin"
    ]
  ],
  "route": [
    [
      "2019 · Jiamusi, Chine",
      "Bachelor de médecine et chirurgie"
    ],
    [
      "2022 · Jiamusi, Chine",
      "Master de médecine clinique, option oncologie"
    ],
    [
      "2022-2023 · Cotonou, Bénin",
      "ENABEL : chef de projet, soins palliatifs"
    ],
    [
      "2023 · France",
      "Stage d'attaché de recherche clinique, CLINACT ; formation d'ARC, Sup Santé"
    ],
    [
      "2024-2026 · Bordeaux, France",
      "Coordination de l'étude GERONTE-FRONE, Université de Bordeaux"
    ]
  ],
  "quote": "« Apporter les ressources de l'Europe en Afrique de l'Ouest. »",
  "project": [
    "Clinical Navigator est un site gratuit qui rassemble, en un seul endroit, les outils, les formations et les ressources de la recherche clinique, adaptés au Bénin et à l'Afrique de l'Ouest. Il s'adresse à tous les niveaux et à tous les rôles, patients compris.",
    "Il est aussi l'auteur, seul, de Café Bénin, un site complet consacré au café, conçu et rédigé par ses soins."
  ],
  "quality": [
    "Formation d'attaché de recherche clinique, Sup Santé (2023).",
    "Certificats FORMATIS : bonnes pratiques cliniques (BPC/GCP), règlement européen 536/2014, RGPD.",
    "ICH-GCP, révision R2.",
    "Mandarin : niveau officiel HSK 4."
  ],
  "linkedin": "https://www.linkedin.com/in/giscard-kevin-hounsinou-bb978baa/"
};
export default function AuthorPage() {
 return <ClinicalShell><article className="pa-page" lang="fr">
  <header className="pa-header"><p className="pa-kicker">Portrait</p><h1>{content.name}</h1><p className="pa-intro">{content.intro}</p><figure><img src={portrait} width="1313" height="875" alt={content.alt}/><figcaption>Illustration réalisée pour ce portrait.</figcaption></figure></header>
  <div className="pa-body">
   <section><p className="pa-kicker">Le récit</p><h2>Un parcours entre l'Asie, l'Afrique et l'Europe</h2>{content.story.map(p=><p key={p}>{p}</p>)}</section>
   <section><p className="pa-kicker">Le tournant</p><h2>La recherche clinique, du stage à la coordination</h2>{content.turn.map(p=><p key={p}>{p}</p>)}</section>
   <div className="pa-stats">{content.stats.map(([n,l])=><div className="pa-stat" key={n}><div className="pa-stat-num">{n}</div><div className="pa-stat-label">{l}</div></div>)}</div>
   <div className="pa-route">{content.route.map(([y,b])=><div className="pa-step" key={y}><span className="pa-step-year">{y}</span><span className="pa-step-body">{b}</span></div>)}</div>
   <section><p className="pa-kicker">Le projet</p><h2>Clinical Navigator, la suite logique</h2><blockquote className="pa-quote"><p className="pa-quote-text">{content.quote}</p><p className="pa-quote-src">L'objectif du site, dans ses mots.</p></blockquote>{content.project.map(p=><p key={p}>{p}</p>)}</section>
   <section className="pa-reperes"><p className="pa-kicker">Ses repères</p><h2>Formation qualité et langues</h2><ul>{content.quality.map(p=><li key={p}>{p}</li>)}</ul></section>
   <section className="pa-contact"><p className="pa-kicker">Le contacter</p><h2>Échanger avec lui</h2><a href={content.linkedin} target="_blank" rel="noreferrer">Profil LinkedIn ↗</a></section>
  </div>
 </article></ClinicalShell>;
}
