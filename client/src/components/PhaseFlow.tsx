const PHASES = ["Avant", "Pendant", "Après"] as const;

export function PhaseFlow({ actions }: { actions: string[] }) {
  const grouped = PHASES.map(label => ({
    label,
    items: actions.filter(action => action.toLowerCase().startsWith(label.toLowerCase() + " :")).map(action => action.slice(label.length + 3)),
  })).filter(phase => phase.items.length > 0);
  if (grouped.length < 2) return null;
  return <div data-testid="phase-flow" className="mb-5">
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#568178]">Schéma de la situation</p>
    <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
      {grouped.map((phase, index) => <div key={phase.label} className="contents">
        {index > 0 && <div aria-hidden="true" className="flex items-center justify-center text-lg font-bold text-[#8ba39b]"><span className="rotate-90 md:rotate-0">→</span></div>}
        <div className="rounded-xl border border-[#d8e2df] bg-[#fbfdfc] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#146557]">{phase.label}</p>
          <ul className="mt-2 space-y-1.5">{phase.items.map(item => <li key={item} className="text-xs leading-5 text-[#365652]">{item}</li>)}</ul>
        </div>
      </div>)}
    </div>
  </div>;
}
