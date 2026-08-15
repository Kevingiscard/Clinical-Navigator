# Décision de fournisseur e-mail transactionnel

Pour Clinical Navigator, **Resend** est le choix recommandé pour l’envoi de rapports administratifs Excel : le produit est orienté API transactionnelle, son offre gratuite est pérenne dans la limite de **100 e-mails par jour** et **3 000 e-mails par mois**, ce qui convient largement à des exports administratifs occasionnels. Les messages entrants et sortants comptent toutefois dans le quota. [1]

| Fournisseur | Offre gratuite vérifiée | Avantage | Réserve |
|---|---:|---|---|
| Resend | 100/jour, 3 000/mois | API simple et adaptée à un rapport transactionnel. | Authentification du domaine expéditeur à prévoir. |
| Brevo | 300/jour, sans limite de durée annoncée | Plus de volume quotidien gratuit. | Marquage Brevo obligatoire sur le plan gratuit et produit plus large. |
| SendGrid | Essai gratuit de 100/jour pendant 60 jours selon la page tarifaire | API mature. | Le niveau gratuit est présenté comme un essai, donc moins adapté à un envoi gratuit durable. |

> Recommandation : choisir **Resend** sauf si vous prévoyez plus de 100 envois quotidiens ; dans ce cas, choisir Brevo. Les exports contenant des données de compte doivent rester déclenchés par un administrateur et tracés.

## Références

[1] [Resend — Account quotas and limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits)  
[2] [Brevo — Limits of the Free plan](https://help.brevo.com/hc/en-us/articles/208580669-FAQs-What-are-the-limits-of-the-Free-plan)  
[3] [Twilio SendGrid — Email API pricing](https://www.twilio.com/en-us/products/email-api/pricing)
