// Simulateur d'inclusion : calcul déterministe sur des hypothèses agrégées. Aucune donnée de participant.
export type EnrollmentInput = { completers: number; centres: number; screenedPerCentreMonth: number; screenFailPct: number; dropoutPct: number; activationLagMonths: number };
export type EnrollmentResult = { ok: true; randomised: number; screened: number; randomisedPerMonth: number; monthsToTarget: number; perMonth: { month: number; cumulative: number }[]; explanation: string[] } | { ok: false; error: string };
const MAX_MONTHS = 240;
export function simulateEnrollment(i: EnrollmentInput): EnrollmentResult {
  const isInt = (n: number) => Number.isInteger(n);
  if (!isInt(i.completers) || i.completers < 1 || i.completers > 100000) return { ok: false, error: "Le nombre de participants à terminer doit être un entier de 1 à 100 000." };
  if (!isInt(i.centres) || i.centres < 1 || i.centres > 1000) return { ok: false, error: "Le nombre de centres doit être un entier de 1 à 1 000." };
  if (!(i.screenedPerCentreMonth > 0) || i.screenedPerCentreMonth > 1000) return { ok: false, error: "Le nombre de personnes présélectionnées par centre et par mois doit être supérieur à 0 (maximum 1 000)." };
  if (!(i.screenFailPct >= 0 && i.screenFailPct < 100)) return { ok: false, error: "Le taux d'échec de présélection doit être au moins 0 et inférieur à 100 %." };
  if (!(i.dropoutPct >= 0 && i.dropoutPct < 100)) return { ok: false, error: "Le taux de sorties d'étude doit être au moins 0 et inférieur à 100 %." };
  if (!isInt(i.activationLagMonths) || i.activationLagMonths < 0 || i.activationLagMonths > 36) return { ok: false, error: "Le délai d'activation doit être un entier de 0 à 36 mois." };
  const randomised = Math.ceil(i.completers / (1 - i.dropoutPct / 100) - 1e-9);
  const screened = Math.ceil(randomised / (1 - i.screenFailPct / 100) - 1e-9);
  const randomisedPerMonth = i.centres * i.screenedPerCentreMonth * (1 - i.screenFailPct / 100);
  const perMonth: { month: number; cumulative: number }[] = [];
  let cumulative = 0, month = 0;
  while (cumulative < randomised && month < MAX_MONTHS) {
    month += 1;
    if (month > i.activationLagMonths) cumulative += randomisedPerMonth;
    perMonth.push({ month, cumulative: Math.min(Math.round(cumulative * 10) / 10, randomised) });
  }
  if (cumulative < randomised) return { ok: false, error: "Le rythme est trop faible : la cible n'est pas atteinte en 20 ans. Revoyez les hypothèses." };
  return { ok: true, randomised, screened, randomisedPerMonth: Math.round(randomisedPerMonth * 100) / 100, monthsToTarget: month, perMonth,
    explanation: [
      `Participants à randomiser = ${i.completers} ÷ (1 − ${i.dropoutPct} %) = ${randomised}, arrondi à l'entier supérieur.`,
      `Personnes à présélectionner = ${randomised} ÷ (1 − ${i.screenFailPct} %) = ${screened}.`,
      `Rythme = ${i.centres} centre(s) × ${i.screenedPerCentreMonth} × (1 − ${i.screenFailPct} %) = ${Math.round(randomisedPerMonth * 100) / 100} randomisation(s) par mois une fois les centres actifs.`,
      `Les centres sont supposés tous actifs à partir du mois ${i.activationLagMonths + 1}, au rythme constant. La réalité varie : ce calcul est un repère de discussion.`,
    ] };
}
