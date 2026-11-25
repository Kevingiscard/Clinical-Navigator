import { FONGBE_PENDING, termBox, translationSteps } from "@/lib/termBox";

export function TermBox() {
  return <section className="mt-6" aria-labelledby="termbox-title">
    <article className="rounded-2xl border border-[#dbe8e3] bg-white p-6 shadow-sm">
      <h3 id="termbox-title" className="font-serif text-xl font-bold leading-snug text-[#143c41]">Boîte à termes français / fongbe</h3>
      <p className="mt-2 text-sm leading-6 text-[#46605b]">Quinze termes à expliquer à un participant, avec une explication simple en français. La colonne fongbe est volontairement à faire : le site ne publie aucune traduction qui n'a pas été fournie et relue par une personne qualifiée.</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption className="sr-only">Termes français, explication simple et traduction en fongbe à faire</caption>
          <thead><tr className="border-b border-[#dbe8e3] text-xs uppercase tracking-wide text-[#365f56]"><th scope="col" className="py-2 pr-3">Terme</th><th scope="col" className="py-2 pr-3">Explication simple</th><th scope="col" className="py-2">Fongbe</th></tr></thead>
          <tbody>{termBox.map(r => <tr key={r.fr} className="border-b border-[#eef3f1] align-top"><th scope="row" className="py-2 pr-3 font-bold text-[#143c41]">{r.fr}</th><td className="py-2 pr-3 text-[#46605b]">{r.plain}</td><td className="py-2 text-[#8a6a1f]">{FONGBE_PENDING}</td></tr>)}</tbody>
        </table>
      </div>
      <h4 className="mt-6 font-serif text-lg font-bold text-[#143c41]">Comment faire traduire et vérifier</h4>
      <ol className="mt-3 grid gap-2">{translationSteps.map((s, i) => <li key={s} className="rounded-lg bg-[#f5f9f7] p-3 text-sm leading-6 text-[#46605b]"><strong>{i + 1}.</strong> {s}</li>)}</ol>
      <p className="mt-3 rounded-xl border border-[#f0e2c0] bg-[#fdf7ea] p-3 text-xs leading-5 text-[#6b4f1d]">Ces cinq étapes sont une pratique générale de bon sens, pas une exigence que le CNERS ou une autre autorité aurait publiée sur ses pages lues : à confirmer auprès du CNERS pour votre étude.</p>
    </article>
  </section>;
}
