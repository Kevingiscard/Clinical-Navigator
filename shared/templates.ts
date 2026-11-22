export interface TemplateDocument {
  id: string;
  title: string;
  kind: "template" | "example";
  summary: string;
  body: string;
}

export const templateDocuments: TemplateDocument[] = [
  {
    id: "lettre-annonce-visite",
    title: "Lettre d'annonce de visite de monitoring",
    kind: "template",
    summary: "Annoncer une visite à un centre : dates, ordre du jour, documents et personnes à rendre disponibles.",
    body: `LETTRE D'ANNONCE DE VISITE DE MONITORING
(Trame à adapter : remplacer chaque élément entre crochets)

[Ville], le [date]

À l'attention de [Prénom NOM], [fonction]
[Service] — [Centre]

Objet : annonce d'une visite de monitoring — étude [code de l'étude] « [titre court] »

Madame, Monsieur,

Dans le cadre du suivi de l'étude [code de l'étude] conduite dans votre centre, je vous propose une visite de monitoring le [date], de [heure] à [heure].

Ordre du jour proposé :
1. Ouverture et point d'avancement du recrutement
2. Vérification des consentements éclairés
3. Revue des données source et comparaison avec le eCRF (échantillon de [nombre] dossiers)
4. Suivi des événements indésirables et de leurs déclarations
5. Produit de l'étude : stock, températures, comptabilité
6. Classeur investigateur et documents essentiels
7. Requêtes et déviations ouvertes
8. Présentation des constats et échange avec l'équipe

Merci de prévoir la disponibilité de : l'investigateur ou son représentant, [le pharmacien], [le coordinateur de recherche], ainsi que des dossiers source des participants inclus, du classeur investigateur, des registres de température et de la comptabilité du produit.

Merci de confirmer la date et les disponibilités avant le [date limite].

[Prénom NOM]
Attaché(e) de recherche clinique — [structure promotrice]
[téléphone] — [adresse e-mail professionnelle]

Rappel : aucune donnée permettant d'identifier directement un participant ne doit figurer dans cette correspondance.`,
  },
  {
    id: "lettre-suivi-visite",
    title: "Lettre de suivi de visite de monitoring",
    kind: "template",
    summary: "Restituer les constats : faits, risques, actions attendues, responsables et délais.",
    body: `LETTRE DE SUIVI DE VISITE DE MONITORING
(Trame à adapter : remplacer chaque élément entre crochets)

[Ville], le [date]

À l'attention de [Prénom NOM], investigateur(rice) principal(e)
[Service] — [Centre]

Objet : compte rendu de la visite de monitoring du [date] — étude [code de l'étude]

Madame, Monsieur,

Je vous remercie pour l'accueil réservé lors de la visite du [date], conduite avec [personnes présentes et fonctions].

1. Rappel du périmètre
Participants revus : [nombre] sur [nombre] inclus. Points couverts : consentements, données source, sécurité, produit, classeur investigateur, requêtes et déviations.

2. Constats
Pour chaque constat : le fait observé, le risque encouru, l'action attendue, le responsable et le délai.

Constat n° 1
- Fait : [description factuelle, sans donnée identifiante]
- Risque : [risque pour les participants, les données ou la conformité]
- Action attendue : [action précise]
- Responsable : [fonction] — Délai : [date]

Constat n° 2
- Fait : [description factuelle]
- Risque : [risque]
- Action attendue : [action précise]
- Responsable : [fonction] — Délai : [date]

3. Points positifs
[Éléments conformes ou remarquables observés pendant la visite.]

4. Réponse attendue
Merci de faire parvenir vos réponses et les preuves des actions menées avant le [date]. Les points non résolus seront suivis avec [fonction du référent promoteur].

5. Prochaine étape
Prochaine visite envisagée : [période].

[Prénom NOM]
Attaché(e) de recherche clinique — [structure promotrice]
[téléphone] — [adresse e-mail professionnelle]

Rappel : aucune donnée permettant d'identifier directement un participant ne doit figurer dans cette correspondance.`,
  },
  {
    id: "log-delegation",
    title: "Log de délégation des tâches",
    kind: "template",
    summary: "Tracer chaque tâche déléguée : personne, qualification, période et signatures.",
    body: `LOG DE DÉLÉGATION DES TÂCHES
(Trame à adapter : le droit national ou le promoteur peut imposer un format propre)

Étude : [code et titre court]
Centre : [nom et numéro du centre]
Investigateur(rice) principal(e) : [Prénom NOM]

Tableau des délégations (une ligne par personne et par tâche) :

| Nom et fonction | Tâche déléguée | Qualification vérifiée (formation, date) | Début de délégation | Fin de délégation | Signature de l'investigateur | Signature du délégataire |
|---|---|---|---|---|---|---|
| [Nom, fonction] | [ex. prise des constantes] | [formation BPC, date ; formation protocole, date] | [date] | [date ou « en cours »] | | |
| [Nom, fonction] | [ex. saisie eCRF] | [formations et dates] | [date] | [date] | | |
| [Nom, fonction] | [ex. gestion du produit] | [formations et dates] | [date] | [date] | | |

Règles d'utilisation :
- Toute tâche est déléguée avant sa première réalisation, jamais rétroactivement.
- Les tâches exigeant une qualification médicale sont réservées aux personnes qualifiées.
- Toute arrivée, départ ou changement de tâche donne lieu à une nouvelle ligne datée et signée.
- Les accès aux systèmes (eCRF, randomisation) correspondent aux tâches déléguées.`,
  },
  {
    id: "fiche-poste-arc",
    title: "Fiche de poste ARC",
    kind: "template",
    summary: "Définir le poste : missions, prérequis, rattachement et évaluation.",
    body: `FICHE DE POSTE — ATTACHÉ(E) DE RECHERCHE CLINIQUE (ARC / CRA)
(Trame à adapter : contrat, statut et rémunération relèvent du droit du travail du pays et sont à faire valider par la structure)

1. Intitulé et rattachement
Poste : Attaché(e) de recherche clinique
Rattachement hiérarchique : [fonction, ex. chef de projet / promoteur]
Études concernées : [codes et titres courts] — Centres : [liste et localisation]

2. Missions
Assurer le monitoring des centres avant, pendant et après la conduite des études, dans le respect du protocole, des bonnes pratiques cliniques et des procédures du promoteur.

3. Activités principales
Avant l'ouverture d'un centre : préparer et conduire la visite d'initiation, vérifier les documents réglementaires, former l'équipe, recommander l'activation.
Pendant l'étude : annoncer et conduire les visites de monitoring, vérifier consentements, données source, sécurité, produit et classeur investigateur, présenter les constats à l'équipe, rédiger les lettres de suivi et vérifier la levée des actions.
Après : conduire la visite de clôture, solder les requêtes, réconcilier le produit, organiser l'archivage.
Transverse : remonter les risques au chef de projet, tenir les outils de suivi à jour, participer aux réunions d'équipe.

4. Prérequis
Formation aux bonnes pratiques cliniques à jour (attestation à fournir).
Diplôme : [ex. licence/master en sciences de la vie, santé ou équivalent].
Expérience : [ex. première expérience encadrée acceptée, ou X années].
Langues : français professionnel requis [préciser si les dossiers sont en français] ; [autre langue selon le contexte].
Qualités : rigueur documentaire, sens du relationnel avec les équipes, capacité à rédiger des constats factuels.

5. Déplacements
[Fréquence et périmètre attendus, ex. visites mensuelles sur [zone].]

6. Évaluation
Période d'intégration encadrée (visites en binôme avec un ARC expérimenté, revue des premiers comptes rendus).
Indicateurs : qualité et délais des comptes rendus, taux de levée des actions, conformité des visites au plan de monitoring.`,
  },
  {
    id: "plan-capa",
    title: "Plan d'actions correctives et préventives (CAPA)",
    kind: "template",
    summary: "Traiter un constat : cause, actions, responsables, délais et vérification d'efficacité.",
    body: `PLAN D'ACTIONS CORRECTIVES ET PRÉVENTIVES (CAPA)
(Trame à adapter : à faire valider par la qualité de la structure)

Référence du constat : [source : audit/inspection/déviation — identifiant — date]
Étude / site concerné : [code étude, centre]

1. Description factuelle du constat
[Ce qui a été observé, sans interprétation ni donnée identifiante.]

2. Analyse des causes
Cause immédiate : [ce qui a directement produit le constat]
Cause sous-jacente : [processus ou organisation défaillant]
Cause racine : [pourquoi le processus a permis la défaillance — méthode des 5 pourquoi ou équivalent]

3. Actions correctives (traiter le constat existant)
| Action | Responsable | Délai | Preuve attendue | Statut |
|---|---|---|---|---|
| [action] | [fonction] | [date] | [document, enregistrement] | [en cours/clôturé] |

4. Actions préventives (empêcher la réapparition)
| Action | Responsable | Délai | Preuve attendue | Statut |
|---|---|---|---|---|
| [action : procédure, formation, contrôle] | [fonction] | [date] | [document, enregistrement] | [en cours/clôturé] |

5. Vérification d'efficacité
Comment et quand l'efficacité des actions sera vérifiée : [méthode, indicateur, date de revue].

6. Validation
Rédigé par : [nom, fonction, date] — Vérifié par : [qualité, date] — Approuvé par : [fonction, date]`,
  },
  {
    id: "exemple-lettre-suivi-remplie",
    title: "Exemple rempli : lettre de suivi de visite",
    kind: "example",
    summary: "La trame de lettre de suivi complétée avec des données entièrement fictives.",
    body: `EXEMPLE ENTIÈREMENT FICTIF — toute ressemblance avec une étude ou un centre réel est fortuite.

LETTRE DE SUIVI DE VISITE DE MONITORING

Cotonou, le 18 novembre 2026

À l'attention du Dr A. GBEGNON, investigateur principal
Service de médecine interne — Centre hospitalier de référence de Parakou (centre 03)

Objet : compte rendu de la visite de monitoring du 16 novembre 2026 — étude PALM-2026-014

Cher Docteur GBEGNON,

Je vous remercie pour l'accueil réservé lors de la visite du 16 novembre, conduite avec vous-même, Mme R. ADJOVI (coordinatrice) et M. K. TOSSOU (pharmacien).

1. Rappel du périmètre
Participants revus : 6 sur 9 inclus. Points couverts : consentements, données source, sécurité, produit, classeur investigateur, requêtes et déviations.

2. Constats

Constat n° 1
- Fait : deux requêtes eCRF ouvertes depuis plus de 30 jours (visites V3 et V4).
- Risque : retard de nettoyage des données avant la revue intermédiaire.
- Action attendue : résoudre ou commenter chaque requête.
- Responsable : coordinatrice — Délai : 2 décembre 2026.

Constat n° 2
- Fait : un relevé de température du 9 novembre absent au registre du produit.
- Risque : traçabilité de conservation incomplète.
- Action attendue : vérifier l'enregistreur, documenter l'écart selon la procédure et rappeler la conduite à tenir à l'équipe.
- Responsable : pharmacien — Délai : 25 novembre 2026.

Constat n° 3
- Fait : la formation au protocole d'un infirmier récemment délégué n'est pas datée dans le log.
- Risque : délégation non documentée avant activité.
- Action attendue : régulariser la ligne du log avec la date réelle de formation (sans antidater) et former avant toute nouvelle tâche.
- Responsable : investigateur — Délai : 25 novembre 2026.

3. Points positifs
Consentements complets et datés avant toute procédure pour les 6 dossiers revus ; registres de sécurité à jour.

4. Réponse attendue
Merci de faire parvenir vos réponses et les preuves des actions menées avant le 2 décembre 2026. Les points non résolus seront suivis avec le chef de projet.

5. Prochaine étape
Prochaine visite envisagée : semaine du 11 janvier 2027.

S. AGOSSA
Attachée de recherche clinique — Institut de recherche pour la santé (structure fictive)
[téléphone] — [adresse e-mail professionnelle]`,
  },
];
