# Changelog

## [Unreleased] — moyens, formations et réseaux (2026-11-21)

- Nouveau module « Trouver des moyens et des relais » : orientation vers des financements (EDCTP, TDR/OMS, Fogarty/NIH), des formations accessibles (traduction française ICH E6(R3) de Swiss TPH, AFCRA, CRENC, TGHN, AVAREF, EUPATI) et des réseaux d’encadrement, chacun avec conditions d’accès à vérifier ; le module oriente, il ne fournit ni ne garantit aucun moyen, et il n’est pas exhaustif.
- Page financement EDCTP vérifiée en direct (fiche pointée vers /funding/) ; page subventions TDR non revérifiée ce jour (navigation depuis l’accueil signalée).
- Module pédagogique « Explication audio du consentement » (/fr/consentement-audio) : six textes simples en français (brouillons à valider), lecture par la voix de synthèse de l’appareil sans aucune donnée enregistrée ni transmise, langues nationales honnêtement marquées indisponibles, encadrement bénin détaillé (docs/consentement-audio-encadrement.md : loi 2010-40 art. 21/26, ABMed EC-LD-0001 §1.2.2, loi 2017-20 art. 394, droits JML CC-BY-SA corpus/modèles non publiés).
- J’aime Ma Langue (jaimemalangue.bj) ajouté comme piste d’accessibilité linguistique pour les patients (objectif : expliquer le consentement dans la langue comprise) : fiche À revoir liée aux modules Patients et Consentement, distinguant ce qui existe (démos vocales en fongbé, corpus ouvert) de ce qui n’est ni proposé ni validé (service d’explication du consentement, traduction médicale automatique) ; le parcours patients invite à demander une explication dans la langue comprise.
- Badges de statut distingués : les pistes dont seuls le lien ou la page ont été vérifiés (EDCTP, TDR, Fogarty, AFCRA, CRENC, RevMan) passent de « Vérifié » à À revoir, les conditions, l’éligibilité et la gratuité n’étant pas confirmées ; la fiche Swiss TPH pointe désormais vers le document eDoc vérifié (traduction non officielle, gratuite).
- Contrôle prépublication du champ libre ajouté (scripts/privacy-free-text-check.py) : test à données fictives sur flux réel (URL/historique, stockage, logs, réseau) + consigne anti-identifiants ; 13/13 au 2026-11-21, documenté dans docs/security-privacy.md.
- Limite d’affichage de 8 fiches par module supprimée : chaque module montre désormais toutes ses fiches liées, avec la recherche et les filtres existants (certaines pages en affichent beaucoup plus, notamment Ressources).
- Correctif « J’ai un problème » : état général sans scénario arbitrairement choisi, branches avec descriptions discriminantes et navigation vers le catalogue, niveaux de spécificité harmonisés entre badges et encarts.

## [Unreleased] — bibliothèque de modèles (2026-11-21)

- Les cinq entrées « modèle » n’étaient que des fiches descriptives : elles renvoient désormais vers de vrais documents éditables. Nouvelle bibliothèque `/fr/modeles` (liste + page par document) avec copie en un clic et téléchargement .txt : lettre d’annonce de visite, lettre de suivi de visite, log de délégation, fiche de poste ARC et plan CAPA, chacun complet avec champs entre crochets à adapter.
- Ajout d’un exemple entièrement rempli (lettre de suivi, étude et personnes fictives) pour montrer le rendu attendu ; toutes les données sont inventées et marquées comme telles.
- Tous les documents restent en statut DRAFT : brouillons pédagogiques à adapter et à faire valider par la structure, sans valeur réglementaire automatique.

## [Unreleased] — orientation Afrique de l’Ouest (2026-11-21)

- Objectif du produit : rendre les ressources européennes utiles en Afrique de l’Ouest, tous niveaux. Le projet distingue explicitement ce qui est transférable (BPC ICH, formations, outils, registres) de ce qui relève du droit local de chaque pays.
- Registre des juridictions : Togo, Burkina Faso, Mali et Niger ajoutés en « portail non confirmé » (aucune source nationale vérifiée) ; seul le Bénin est documenté. jurisdictionRegistry 1.3.0.
- Publics élargis : ressources gratuites ou étiquetées pour tout le personnel de recherche et pour les patients/grand public (EUPATI Toolbox FR et Open Classroom gratuite, AVAREF OMS-Afrique, TGHN hub Afrique, CRENC Learn FR/EN), origines Europe, internationale et africaine ; un parcours patients distinct est prévu dans l’architecture.

## [Unreleased], actualisation Europe et approfondissement Bénin (2026-11-21)

- Distinction authenticité / applicabilité : les lois béninoises 2010-40, 2021-03 et 2017-20 passent en « à revoir » (texte authentique SGG/APDP confirmé, version consolidée à confirmer) ; les lignes directrices ABMed EC-LD-0001 et le CNERS restent la couverture vérifiée du Bénin. Même traitement pour la loi Jardé (texte JORF authentique, état applicable = CSP consolidé).
- Actualité Europe revérifiée en direct : CTIS Sponsor Handbook mis à jour au 17/07/2026 par l’EMA (entrée passée en « à revoir », version numérotée retirée) ; CNIL MR-001 confirmée (26/05/2026) ; ICH E6(R3) cohérent (Annexe 2 étape 4 juin 2026, application 15/01/2027) ; ISO 14155:2026 (édition 4, mars 2026) confirmée édition courante, l’édition 2020 étant retirée.
- Ajouts Europe sourcés : RGPD 2016/679, loi Jardé 2012-300, MDR 2017/745, ISO 14155:2026, EudraLex volume 10, EDCTP et adrreports.eu (EudraVigilance), avec statut, juridiction et limites.
- Scénario « Soumission AEC au Bénin » : parcours ABMed EC-LD-0001 (dossier en français, évaluations scientifiques CNERS, enregistrement PACTR, dépôt service-public.bj, délais cibles 60/30 jours, rapport annuel), présenté comme pédagogique et à valider localement.
- Référentiels versionnés : referenceRegistry 1.2.0, jurisdictionRegistry 1.2.0, knowledgeDataset 1.2.0.

## [Unreleased], couverture Bénin et catalogue formations/outils (2026-11-21)

- Bénin documenté depuis les sources nationales vérifiées : lignes directrices ABMed EC-LD-0001 (v1, applicable 12/09/2025), loi n° 2010-40 (CNERS), loi n° 2021-03 (art. 80), loi n° 2017-20 (APDP) et PACTR ; la juridiction Bénin passe de « portail non confirmé » à « source trouvée, revue locale obligatoire » et est placée en tête du registre.
- Base de connaissances bilingue : entrées Bénin, ABMed, CNERS, AEC et PACTR (158 entrées au total).
- Catalogue transversal : 26 ressources ajoutées, formations (NIDA GCP, Global Health Network, CITI Program), sources Bénin et registres (ABMed, CNERS, service-public.bj, PACTR, ClinicalTrials.gov, ICTRP, ClinRegs, EQUATOR, PRISMA, PROSPERO, VigiAccess) et outils (REDCap, OpenClinica, Epi Info, OpenEpi, GNU PSPP, R, Zotero, Rayyan, RevMan), chacune avec statut, juridiction et date de revue.
- Référentiels versionnés : referenceRegistry 1.1.0, jurisdictionRegistry 1.1.0, knowledgeDataset 1.1.0.
- Vérifications : pnpm check, knowledge:verify, knowledge:graph:verify, module:resources:validate et build:static passent ; liens audités sans anomalie.

## [Unreleased], production-readiness


- Ajout d’un point d’entrée Express réutilisable par Vercel et le serveur local.
- Ajout de `/api/health` et du cron sécurisé `/api/cron/daily-maintenance`.
- Ajout de `.env.example`, `SECURITY.md`, des headers de sécurité et du rate limiting.
- Ajout du disclaimer médical, du consentement analytics conditionnel et des mentions légales.
- Ajout des tests d’intégration, Playwright E2E et axe accessibilité.
- Ajout des workflows CI, sécurité, release gate et Vercel manuel.

## [1.0.0]

- Première version structurée de Clinical Navigator avec parcours de problème, conception d’essai, audit, outils et registre de références.
