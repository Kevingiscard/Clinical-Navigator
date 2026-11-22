# Encadrement de la fonction « explication audio du consentement » (Bénin d'abord)

Document de référence, établi le 21/11/2026 à partir des sources primaires citées (URLs complètes en fin de sections). Orientation documentaire, pas un avis juridique : chaque étude et chaque pays exige une vérification propre. Une simple mise en garde sur la page ne constitue ni une protection suffisante ni une exonération.

## 1. Consentement : ce que la loi béninoise exige

- Loi n° 2010-40 (recherches impliquant la personne humaine), art. 21 : le consentement est « éclairé » lorsque la personne sollicitée **comprend** le but et la nature de la recherche, les obligations qu'implique sa participation ainsi que les risques et avantages qui peuvent en découler.
- Art. 26 : avant toute recherche clinique et/ou biomédicale, consentement libre, éclairé et exprès recueilli après information de la personne sur l'objectif, la méthodologie, la durée, les résultats attendus, les contraintes, les risques prévisibles et l'avis du CNERS ; la personne est informée de son droit de refuser ou de retirer son adhésion à tout moment. Formulation exacte sur la forme : « Le consentement est donné par écrit ou, en cas d'impossibilité, attesté par un tiers. Ce dernier doit être totalement indépendant du chercheur et du promoteur. »
- Art. 27-28 : mineurs et majeurs protégés — conditions et représentation spécifiques. Art. 29 : assurance responsabilité civile du promoteur. Art. 24 : direction par un chercheur qualifié.
- Conséquence : une explication audio peut aider à la compréhension ; elle ne constitue pas le consentement, qui reste écrit ou attesté par un tiers indépendant. La loi n'exige pas que l'information soit donnée en français ; elle exige qu'elle soit comprise.
- Source : https://sgg.gouv.bj/doc/loi-2010-40/download (texte SGG téléchargé le 21/11/2026 ; version consolidée non confirmée).

## 2. Documents propres à une étude (champ ABMed uniquement)

- Lignes directrices ABMed EC-LD-0001 v1 (applicables depuis le 12/09/2025), §1.2.2, formulation exacte : « Toutes les demandes, ainsi que les documents annexes, y compris les fiches d'information des participants et les formulaires de consentement éclairé (FCE) doivent être rédigés en langue française. Lorsque les documents ne sont pas rédigés en français, une copie du document dans sa langue originale, accompagnée d'une traduction certifiée conforme en français, doit être fournie. »
- Portée : cette exigence concerne les **demandes d'autorisation d'essai clinique soumises à l'ABMed** et leurs annexes ; elle ne crée pas d'obligation générale pour du matériel pédagogique hors essai. Le tableau des documents essentiels inclut le « consentement informé (y compris toutes les traductions applicables) ». Personnes vulnérables : mesures renforcées dont témoin impartial pour la procédure de consentement (§1.9.1).
- Conséquence : si des textes d'explication en langue nationale sont utilisés avec les participants d'un essai relevant de l'ABMed, ils entrent dans le dossier, avec traduction certifiée conforme en français lors de la soumission.
- Source : https://abmed.bj/lirePDF/c8e5bd19-8591-4079-bcb7-c4485be766db (v1, téléchargée le 21/11/2026).

## 3. Données, voix et hébergement (code du numérique, Livre 5)

- Régime en vigueur : loi n° 2017-20 du 20/04/2018, **modifiée par la loi n° 2020-35 du 06/01/2021** (confirmé « en vigueur » par https://innovation.gouv.bj/textes-juridiques et le guide APDP ci-dessous, le 21/11/2026).
- Définitions (guide officiel APDP et Livre 5) : un **enregistrement vocal est une donnée à caractère personnel lorsqu'il permet d'identifier une personne** ou se rapporte à une personne identifiable ; les **données de santé** sont celles qui révèlent l'état de santé ; le traitement des **données biométriques aux fins d'identifier une personne de manière unique** et des données de santé est interdit sauf exceptions encadrées (art. 394 de la version 2018 ; numérotation consolidée post-amendement à vérifier). Une voix enregistrée n'est donc pas automatiquement une donnée biométrique sensible : tout dépend de l'identifiabilité, du contenu (santé révélée) et de la finalité du traitement.
- Formalités : déclaration préalable ou demande d'autorisation auprès de l'APDP selon le cas (art. 405 et 407 ; dispenses art. 410) ; l'autorisation n'exonère pas de la responsabilité envers les tiers. Collecte de données sensibles hors conditions légales : manquement grave (art. 453).
- Sources : https://sgg.gouv.bj/doc/loi-2017-20/download (version 2018 téléchargée le 21/11/2026) ; guide APDP : https://apiprod.apdp.bj/storage/981ba962bcdcc7a77b21b05e784b69e1/GUIDE-DE-MISE-EN-CONFORMITE_Pt_YD_revu.pdf ; texte modificatif listé sur http://www.asin.bj/documents/.

### Ce que fait réellement le prototype actuel

- La page lit un **texte pédagogique général, non personnel** ; elle n'a ni micro, ni formulaire patient, ni enregistrement applicatif. L'hébergeur (GitHub Pages) conserve des journaux techniques de connexion.
- La lecture utilise la synthèse vocale du navigateur/système (Web Speech API). **Il n'est pas établi que la synthèse est toujours locale** : selon le navigateur et l'appareil, elle peut passer par un service du système ; le comportement réseau réel n'a pas été mesuré sur les appareils des utilisateurs. Aucune promesse « tout reste sur l'appareil » n'est faite.
- Build statique hébergé sur GitHub Pages ; mesure d'audience désactivée dans ce build (drapeau VITE_ANALYTICS_ENABLED non défini). Le test réseau automatisé du 21/11/2026 sur le parcours « J'ai un problème » n'a montré aucune requête externe ; ce test ne couvre pas le moteur de synthèse vocale des vrais appareils.
- Toute évolution enregistrant la voix d'un patient ou des informations de santé (ex. envoi vers un modèle distant) relèverait du Livre 5 (finalité, base légale, formalités APDP, sécurité).

## 4. Droits sur les modèles et contenus J'aime Ma Langue

- Corpus vocal fongbé JML-fon-speech-v1 : ouvert sous licence **CC-BY-SA-4.0**, vérifié le 21/11/2026 sur https://huggingface.co/datasets/JaimeMaLangue/JML-fon-speech-v1.
- Modèles (reconnaissance, synthèse, traduction) : **non publiés sous licence identifiable** à ce jour (aucun modèle listé sous l'organisation JaimeMaLangue le 21/11/2026) ; leur usage ne peut pas être présumé et nécessiterait les conditions du projet. Aucun contact pris ; aucune redistribution de contenu.

## 5. Qui doit valider le dispositif concret

- **Textes et traductions propres à une étude** : l'instance d'éthique compétente (au Bénin, le CNERS, loi 2010-40 art. 43 et suivants) et, pour les essais relevant de l'ABMed (loi 2021-03, art. 80), l'ABMed — via le dossier de l'étude, traductions certifiées conformes incluses.
- **Traitement de données personnelles** (seulement si une évolution en collecte) : formalités APDP du Livre 5 (art. 405/407, dispenses art. 410).
- **Qualité linguistique et médicale des textes** : relecture par des professionnels compétents (langue concernée et domaine clinique) ; aucune autorité formelle spécifique n'est identifiée pour cette relecture — ce n'est pas une obligation inventée ici, mais une condition de fiabilité.
- Le promoteur et l'investigateur restent responsables du processus (loi 2010-40, art. 26 et 29). Un avertissement affiché ne remplace aucune de ces validations.
- GCP : témoin impartial pour les participants ne sachant pas lire, aligné avec ICH E6(R3) ; traduction française non officielle des principes, gratuite : https://edoc.unibas.ch/entities/publication/afb72840-aa16-43e4-8c2e-a9bc42cb01df (vérifié le 21/11/2026).

## 6. Hors Bénin

Les règles citées sont béninoises. Toute utilisation dans un autre pays exige la vérification de ses propres exigences (éthique, langue des documents, protection des données). Ne pas transposer la France ou l'UE par défaut.
