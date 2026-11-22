#!/usr/bin/env python3
"""Controle prepublication du champ libre "J'ai un probleme".

Test a donnees fictives sur flux reel (build statique servi localement) :
1. Saisie de marqueurs fictifs dans les champs "Situation generale" et "Probleme rencontre".
2. Verification qu'ils n'apparaissent ni dans l'URL/historique, ni dans le stockage
   navigateur (localStorage, sessionStorage, cookies), ni dans les logs console,
   ni dans les requetes reseau (aucune requete externe attendue).
3. Verification de la consigne anti-identifiants visible pres de la saisie.

Prerequis : build statique present dans dist/public, google-chrome et le paquet
python websocket-client disponibles. Usage : python3 scripts/privacy-free-text-check.py
Sortie : PASS/FAIL par controle, code de sortie 1 si une exposition est constatee.
"""
import json, subprocess, sys, time, urllib.request

PORT_HTTP, PORT_CDP = 8485, 9282
MARK1, MARK2 = 'ZXQMARQUEURSITU7731', 'ZXQMARQUEURPROB8842'

srv = subprocess.Popen(['python3', '-m', 'http.server', str(PORT_HTTP), '-d', 'dist/public'],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
chrome = subprocess.Popen(['google-chrome', '--headless=new', '--no-sandbox', '--disable-gpu',
                           f'--remote-debugging-port={PORT_CDP}', '--user-data-dir=/tmp/cn-priv-check-profile',
                           '--window-size=390,844', 'about:blank'],
                          stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
failures = []
try:
    import websocket
    time.sleep(3)
    req = urllib.request.Request(f'http://localhost:{PORT_CDP}/json/new?http://localhost:{PORT_HTTP}/fr/probleme', method='PUT')
    target = json.load(urllib.request.urlopen(req))
    ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=30, suppress_origin=True)
    mid = [0]; netreqs = []; consolelogs = []

    def send(method, params=None):
        mid[0] += 1
        ws.send(json.dumps({'id': mid[0], 'method': method, 'params': params or {}}))
        while True:
            msg = json.loads(ws.recv())
            if msg.get('id') == mid[0]:
                return msg.get('result', {})

    def drain():
        ws.settimeout(0.3)
        try:
            while True:
                msg = json.loads(ws.recv())
                m = msg.get('method')
                if m == 'Network.requestWillBeSent':
                    r = msg['params']['request']
                    netreqs.append(r.get('url', '') + ' ' + str(r.get('postData', '')))
                elif m == 'Runtime.consoleAPICalled':
                    consolelogs.append(' '.join(str(a.get('value', '')) for a in msg['params'].get('args', [])))
                elif m == 'Log.entryAdded':
                    consolelogs.append(msg['params']['entry'].get('text', ''))
        except Exception:
            pass
        ws.settimeout(30)

    def ev(expr):
        r = send('Runtime.evaluate', {'expression': expr, 'returnByValue': True})
        drain()
        return r.get('result', {}).get('value')

    def check(name, ok, detail=''):
        print(('PASS' if ok else 'FAIL'), name, detail)
        if not ok:
            failures.append(name)

    send('Page.enable'); send('Runtime.enable'); send('Network.enable'); send('Log.enable')
    time.sleep(4)
    ev("(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim().startsWith(\"J'ai compris\")); if(b){b.click();return 1;} return 0;})()")
    for i in range(8):
        if ev("document.querySelectorAll('textarea').length"):
            txt = MARK1 if i == 3 else MARK2
            ev(f"""(()=>{{const el=document.querySelector('textarea'); const s=Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'value').set; s.call(el,'{txt} situation fictive de test'); el.dispatchEvent(new Event('input',{{bubbles:true}})); return 1;}})()""")
            if i == 4:
                body = ev("document.body.innerText") or ''
                check('consigne alerte anti-identifiants visible pres de la saisie',
                      'Noms, identifiants, num' + 'ros de dossier' in body.replace('numéros', 'num ros'.replace(' ', '')))
                check('consigne en-tete sans donnee identifiante visible',
                      'identifier un participant' in body)
                check('placeholder non identifiant', 'non identifiants' in (ev("document.querySelector('textarea').placeholder") or ''))
        else:
            ev("(()=>{const c=document.querySelector('.min-h-64'); const b=c?c.querySelector('button'):null; if(b){b.click();return 1;} return 0;})()")
        time.sleep(0.5)
        ev("(()=>{const b=[...document.querySelectorAll('button')].find(x=>/^(Continuer|Voir le plan)/.test(x.textContent.trim())); if(b){b.click();return 1;} return 0;})()")
        time.sleep(0.8)
    check('resultat rendu apres parcours complet', bool(ev("document.body.innerText.includes('Actions à vérifier')")))
    href = str(ev('location.href'))
    check('marqueurs absents de URL', MARK1 not in href and MARK2 not in href, href)
    check('historique sans entree supplementaire', ev('history.length') == 1)
    check('history.state vide', str(ev('JSON.stringify(history.state)')) == 'null')
    ls = str(ev('JSON.stringify(window.localStorage)')); ss = str(ev('JSON.stringify(window.sessionStorage)')); ck = str(ev('document.cookie'))
    check('marqueurs absents de localStorage', MARK1 not in ls and MARK2 not in ls)
    check('marqueurs absents de sessionStorage', MARK1 not in ss and MARK2 not in ss)
    check('marqueurs absents des cookies', MARK1 not in ck and MARK2 not in ck)
    drain()
    joined = '\n'.join(netreqs)
    check('marqueurs absents des requetes reseau', MARK1 not in joined and MARK2 not in joined, f'{len(netreqs)} requetes')
    ext = [u for u in netreqs if f'localhost:{PORT_HTTP}' not in u]
    check('aucune requete externe pendant le parcours', len(ext) == 0, f'{len(ext)} externes')
    cl = '\n'.join(consolelogs)
    check('marqueurs absents des logs console', MARK1 not in cl and MARK2 not in cl, f'{len(consolelogs)} entrees')
finally:
    chrome.terminate(); srv.terminate()

if failures:
    print('EXPOSITION REELLE CONSTATEE:', failures)
    sys.exit(1)
print('TOUS LES CONTROLES PASSENT')
