# Knowledge update process

Les mises à jour doivent porter une version de dataset, un `updatedAt`, un checksum ou un diff lorsque le canal le permet, et une date de synchronisation. Le client peut conserver une copie locale du seed public, mais il doit afficher la date de dernière synchronisation et signaler les données hors ligne potentiellement obsolètes.

Une source nouvelle ou modifiée crée une `REVIEW_TASK` avec priorité, raison, source, date de détection, reviewer et échéance. La mise à jour passe par draft puis validation. Le changelog doit indiquer l’ID, la version précédente, la version nouvelle, le statut et la décision humaine.
