// Compositeur de sessions de quiz : assemble des sessions depuis la banque
// de questions rédigée et sourcée du site. Aucune question n'est générée
// automatiquement : seuls l'ordre des questions et l'ordre des options
// changent. Les explications et sources suivent chaque question.

export type ComposableQuestion = { q: string; options: string[]; answer: number; explain: string; source: string | null };

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleOptions(question: ComposableQuestion): ComposableQuestion {
  const order = shuffled(question.options.map((_, i) => i));
  return {
    ...question,
    options: order.map(i => question.options[i]),
    answer: order.indexOf(question.answer),
  };
}

// Tire `count` questions sans remise (ou toutes si count dépasse), dans un
// ordre mélangé, avec les options mélangées pour chacune.
export function composeSession(pool: ComposableQuestion[], count = pool.length): ComposableQuestion[] {
  return shuffled(pool).slice(0, Math.max(1, Math.min(count, pool.length))).map(shuffleOptions);
}
