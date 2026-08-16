import { useEffect, useMemo, useState } from 'react';
import { ClinicalShell } from '@/components/ClinicalShell';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Copy, Download } from 'lucide-react';

type Diagnostic = any;

const badgeClass = (value: string) => value === 'OK' ? 'bg-emerald-100 text-emerald-800' : value === 'WARNING' ? 'bg-amber-100 text-amber-800' : value === 'ERROR' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700';
const Icon = ({ value }: { value: string }) => value === 'OK' ? <CheckCircle2 className="h-4 w-4" /> : value === 'WARNING' ? <AlertTriangle className="h-4 w-4" /> : value === 'ERROR' ? <XCircle className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />;

export default function DiagnosticsPage() {
  const [data, setData] = useState<Diagnostic | null>(null);
  useEffect(() => { fetch('/Clinical-Navigator/diagnostics/latest.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : Promise.reject(new Error('Diagnostics unavailable'))).then(setData).catch(() => setData({ status: { overall: 'UNKNOWN' }, errors: ['Rapport diagnostique indisponible depuis l’hébergement statique.'], warnings: [] })); }, []);
  const json = useMemo(() => JSON.stringify(data ?? {}, null, 2), [data]);
  const copy = async () => { try { await navigator.clipboard.writeText(json); } catch {} };
  const download = () => { const blob = new Blob([json], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'clinical-navigator-diagnostics.json'; a.click(); URL.revokeObjectURL(a.href); };
  const status = data?.status?.overall ?? 'UNKNOWN';
  return <ClinicalShell>
    <main className="container max-w-6xl py-10">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39806f]">System Diagnostics</p><h1 className="mt-2 font-serif text-4xl font-bold text-[#0d2b36]">État réel de Clinical Navigator</h1><p className="mt-3 max-w-3xl text-[#526b67]">Rapport statique généré à partir du code et des contrôles du dépôt. Un statut UNKNOWN signifie que le test n’a pas été exécuté ou ne peut pas être vérifié ici.</p></div>
        <Badge className={`${badgeClass(status)} px-4 py-2 text-sm`}><span className="mr-2"><Icon value={status}/></span>{status}</Badge>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5"/>Build</CardTitle></CardHeader><CardContent className="text-sm text-[#526b67]"><div>Version : <strong>{data?.build?.version ?? 'UNKNOWN'}</strong></div><div>Commit : <code>{data?.build?.commitSha ?? 'UNKNOWN'}</code></div><div>Branche : {data?.build?.branch ?? 'UNKNOWN'}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Fonctionnalités</CardTitle></CardHeader><CardContent className="grid grid-cols-2 gap-2 text-sm">{Object.entries(data?.features ?? {}).map(([k,v]) => <div key={k} className="flex justify-between rounded border p-2"><span>{k}</span><Badge className={v ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}>{v ? 'PRESENT' : 'ABSENT'}</Badge></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Références</CardTitle></CardHeader><CardContent className="grid grid-cols-1 gap-2 text-sm">{Object.entries(data?.references ?? {}).map(([k,v]) => <div key={k} className="flex justify-between rounded border p-2"><span>{k}</span><Badge className={v ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}>{v ? 'PRESENT' : 'UNKNOWN'}</Badge></div>)}</CardContent></Card>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Routes surveillées</CardTitle></CardHeader><CardContent className="space-y-2">{(data?.routes ?? []).map((r:any) => <div key={r.route} className="flex items-center justify-between rounded border p-3 text-sm"><span>{r.route}</span><Badge className={r.present ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}>{r.present ? 'PRESENTE' : 'MANQUANTE'}</Badge></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Maintenance</CardTitle></CardHeader><CardContent className="space-y-2">{Object.entries(data?.maintenance ?? {}).map(([k,v]) => <div key={k} className="flex items-center justify-between rounded border p-3 text-sm"><span>{k}</span><Badge className={v ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}>{v ? 'ACTIVE' : 'NON DETECTEE'}</Badge></div>)}</CardContent></Card>
      </div>
      <Card className="mt-6"><CardHeader><CardTitle>Warnings & erreurs</CardTitle></CardHeader><CardContent><div className="space-y-2">{[...(data?.errors ?? []).map((x:string)=><div key={`e-${x}`} className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-900">ERROR — {x}</div>), ...(data?.warnings ?? []).map((x:string)=><div key={`w-${x}`} className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">WARNING — {x}</div>)].length ? [...(data?.errors ?? []).map((x:string)=><div key={`e2-${x}`} className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-900">ERROR — {x}</div>), ...(data?.warnings ?? []).map((x:string)=><div key={`w2-${x}`} className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">WARNING — {x}</div>)] : <div className="text-sm text-[#526b67]">Aucun warning ni erreur dans le rapport statique.</div>}</div></CardContent></Card>
      <div className="mt-6 flex flex-wrap gap-3"><button onClick={copy} className="inline-flex items-center gap-2 rounded-md bg-[#0d2b36] px-4 py-2 text-sm font-semibold text-white"><Copy className="h-4 w-4"/>Copier JSON</button><button onClick={download} className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold"><Download className="h-4 w-4"/>Télécharger le rapport</button><a href="/Clinical-Navigator/diagnostics/latest.json" className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-semibold">Ouvrir le JSON brut</a></div>
    </main>
  </ClinicalShell>
}
