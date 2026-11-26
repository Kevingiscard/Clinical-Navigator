import { getStore } from '@edgeone/pages-blob';
import { DOCS } from './docs-data.js';

// Fonctions gratuites de Clinical Navigator : fichiers téléchargeables, scores de quiz anonymes,
// "fiche utile", sauvegarde par code personnel, signalements modérés.
// Aucune donnée nominative : ni IP, ni e-mail, ni identifiant de visiteur n'est enregistré.
const ID = /^[a-z0-9][a-z0-9-]{0,80}$/;
const CODE = /^[a-hj-km-np-z2-9]{16}$/;
const DAILY_CAP = { score: 6000, vote: 6000, save: 3000, report: 200, create: 1500 };
const MAX_SAVE = 20000;
const recent = new Map();

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=UTF-8', 'Cache-Control': 'no-store' }
});
const today = () => new Date().toISOString().slice(0, 10);

function limited(request, key, max, windowMs) {
  const ip = (request.headers.get('x-forwarded-for') || request.headers.get('eo-connecting-ip') || 'x').split(',')[0].trim();
  const id = key + '|' + ip;
  const now = Date.now();
  const list = (recent.get(id) || []).filter(t => now - t < windowMs);
  if (list.length >= max) { recent.set(id, list); return true; }
  list.push(now); recent.set(id, list);
  if (recent.size > 3000) recent.clear();
  return false;
}
async function readJson(store, key, fallback) {
  try { const v = await store.get(key, { type: 'json', consistency: 'strong' }); return v || fallback; } catch { return fallback; }
}
async function bumpDay(store, kind) {
  const key = 'quota/' + today() + '-' + kind + '.json';
  const q = await readJson(store, key, { n: 0 });
  if (q.n >= (DAILY_CAP[kind] || 1000)) return false;
  q.n += 1;
  await store.setJSON(key, q);
  return true;
}
function cleanText(value, max) {
  return String(value || '').replace(/[\u0000-\u001f\u007f<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}
function hasPersonalOrSpam(text) {
  return /https?:\/\/|www\.|@[\w.-]+\.[a-z]{2,}|\b\+?\d[\d .-]{7,}\d\b|\.(com|ru|cn|xyz|top)\b/i.test(text) || /(.)\1{9,}/.test(text);
}
function newCode() {
  const alphabet = 'abcdefghjkmnpqrstuvwxyz23456789';
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => alphabet[b % alphabet.length]).join('');
}
async function body(request) {
  try {
    const text = await request.text();
    if (text.length > MAX_SAVE + 2000) return null;
    return JSON.parse(text);
  } catch { return null; }
}

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || '';
  let store = null;
  try {
    try { store = getStore('clinical-navigator-data'); } catch { store = null; }
    // (d) Fichiers téléchargeables, générés une fois puis conservés comme fichiers.
    if (request.method === 'GET' && action === 'doc') {
      const id = url.searchParams.get('id') || '';
      const doc = ID.test(id) ? DOCS[id] : null;
      if (!doc) return json({ error: 'inconnu' }, 404);
      const key = 'docs/' + id + '.md';
      let md = null;
      try { md = store ? await store.get(key, { type: 'text' }) : null; } catch { md = null; }
      if (!md || md !== doc.md) { md = doc.md; try { if (store) await store.set(key, md); } catch { /* lecture seule : on sert quand même */ } }
      return new Response('\ufeff' + md, { status: 200, headers: {
        'Content-Type': 'text/markdown; charset=UTF-8',
        'Content-Disposition': 'attachment; filename="clinical-navigator-' + id + '.md"',
        'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' } });
    }
    if (request.method === 'GET' && action === 'docs') {
      return json({ docs: Object.entries(DOCS).map(([id, d]) => ({ id, title: d.title })) });
    }

    if (!store) return json({ error: 'service indisponible' }, 503);
    // (b) Questions les plus ratées.
    if (request.method === 'GET' && action === 'top') {
      const quiz = url.searchParams.get('quiz') || '';
      if (!ID.test(quiz)) return json({ error: 'quiz invalide' }, 400);
      const d = await readJson(store, 'quiz/' + quiz + '.json', { attempts: 0, miss: {} });
      const top = Object.entries(d.miss || {}).map(([q, n]) => ({ q, n })).sort((a, b) => b.n - a.n).slice(0, 10);
      return json({ attempts: d.attempts || 0, top });
    }
    // (c) Compteur utile / pas utile.
    if (request.method === 'GET' && action === 'votes') {
      const fiche = url.searchParams.get('fiche') || '';
      if (!ID.test(fiche)) return json({ error: 'fiche invalide' }, 400);
      const d = await readJson(store, 'votes/' + fiche + '.json', { yes: 0, no: 0 });
      return json({ yes: d.yes || 0, no: d.no || 0 });
    }
    // (a) Lecture d'une sauvegarde par code.
    if (request.method === 'GET' && action === 'load') {
      const code = (url.searchParams.get('code') || '').toLowerCase();
      if (!CODE.test(code)) return json({ error: 'code invalide' }, 400);
      if (limited(request, 'load', 20, 60000)) return json({ error: 'trop de demandes' }, 429);
      const d = await readJson(store, 'progress/' + code + '.json', null);
      if (!d) return json({ error: 'introuvable' }, 404);
      return json({ data: d.data, updated: d.updated });
    }

    if (request.method !== 'POST') return json({ error: 'méthode non permise' }, 405);
    const b = await body(request);
    if (!b || typeof b !== 'object') return json({ error: 'corps invalide' }, 400);

    if (action === 'score') {
      const quiz = String(b.quiz || '');
      if (!ID.test(quiz) || !Array.isArray(b.missed) || b.missed.length > 100) return json({ error: 'score invalide' }, 400);
      if (limited(request, 'score', 20, 60000)) return json({ error: 'trop de demandes' }, 429);
      const missed = b.missed.map(String).filter(q => ID.test(q)).slice(0, 100);
      if (!(await bumpDay(store, 'score'))) return json({ ok: false, reason: 'plafond du jour' });
      const key = 'quiz/' + quiz + '.json';
      const d = await readJson(store, key, { attempts: 0, miss: {} });
      d.attempts = (d.attempts || 0) + 1;
      for (const q of missed) d.miss[q] = (d.miss[q] || 0) + 1;
      if (Object.keys(d.miss).length > 500) return json({ ok: false, reason: 'trop de questions' });
      await store.setJSON(key, d);
      return json({ ok: true });
    }
    if (action === 'vote') {
      const fiche = String(b.fiche || '');
      if (!ID.test(fiche) || (b.v !== 0 && b.v !== 1)) return json({ error: 'vote invalide' }, 400);
      if (limited(request, 'vote', 10, 60000)) return json({ error: 'trop de demandes' }, 429);
      if (!(await bumpDay(store, 'vote'))) return json({ ok: false, reason: 'plafond du jour' });
      const key = 'votes/' + fiche + '.json';
      const d = await readJson(store, key, { yes: 0, no: 0 });
      if (b.v === 1) d.yes = (d.yes || 0) + 1; else d.no = (d.no || 0) + 1;
      await store.setJSON(key, d);
      return json({ ok: true, yes: d.yes, no: d.no });
    }
    if (action === 'create') {
      if (limited(request, 'create', 3, 3600000)) return json({ error: 'trop de demandes' }, 429);
      if (!(await bumpDay(store, 'create'))) return json({ error: 'plafond du jour' }, 503);
      return json({ code: newCode() });
    }
    if (action === 'save') {
      const code = String(b.code || '').toLowerCase();
      const data = b.data;
      if (!CODE.test(code) || !data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'sauvegarde invalide' }, 400);
      const clean = {};
      for (const [k, v] of Object.entries(data)) {
        if (!/^(cn_[a-z_0-9]{1,40}|cn-module-checklist-[a-z0-9-]{1,60}|clinical-navigator-design(-draft)?)$/.test(k)) continue;
        if (typeof v !== 'string' || v.length > 8000) continue;
        clean[k] = v;
      }
      const size = JSON.stringify(clean).length;
      if (size > MAX_SAVE || !Object.keys(clean).length) return json({ error: 'sauvegarde vide ou trop grande' }, 400);
      if (limited(request, 'save', 10, 60000)) return json({ error: 'trop de demandes' }, 429);
      if (!(await bumpDay(store, 'save'))) return json({ error: 'plafond du jour' }, 503);
      await store.setJSON('progress/' + code + '.json', { data: clean, updated: today() });
      return json({ ok: true });
    }
    if (action === 'forget') {
      const code = String(b.code || '').toLowerCase();
      if (!CODE.test(code)) return json({ error: 'code invalide' }, 400);
      await store.delete('progress/' + code + '.json');
      return json({ ok: true });
    }
    // (e) Signalement d'erreur : jamais publié automatiquement, relu avant toute correction.
    if (action === 'report') {
      const page = cleanText(b.page, 120);
      const text = cleanText(b.text, 500);
      if (!/^\/[a-z0-9\-\/]{0,100}$/i.test(page) || text.length < 10) return json({ error: 'signalement invalide' }, 400);
      if (hasPersonalOrSpam(text)) return json({ error: 'Merci de ne pas inclure de lien, d\'adresse e-mail ni de numéro.' }, 422);
      if (limited(request, 'report', 3, 3600000)) return json({ error: 'trop de demandes' }, 429);
      if (!(await bumpDay(store, 'report'))) return json({ error: 'plafond du jour' }, 503);
      const key = 'reports/pending/' + new Date().toISOString().replace(/[:.]/g, '-') + '-' + newCode().slice(0, 6) + '.json';
      await store.setJSON(key, { page, text, at: new Date().toISOString(), status: 'a-relire' });
      return json({ ok: true });
    }
    return json({ error: 'action inconnue' }, 400);
  } catch (e) {
    return json({ error: 'service indisponible' }, 503);
  }
  }
