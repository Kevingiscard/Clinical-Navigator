import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
const server=spawn('python3',['-m','http.server','8166'],{cwd:'dist/public',stdio:'ignore'});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
await context.addInitScript(()=>{localStorage.setItem('cn_disclaimer_v1','accepted')});
const page=await context.newPage(); const errors=[];const failed=[]; const requests=[];
page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()}));page.on('request',r=>requests.push(r.url()));
const result={time:new Date().toISOString(),routes:[],widths:[],axe:[],errors,failed};
try{
 const app=fs.readFileSync('client/src/App.tsx','utf8');const routes=[...new Set([...app.matchAll(/path="([^"]+)"/g)].map(m=>m[1]).filter(r=>!r.includes(':')))];
 for(const route of routes){await page.goto('http://127.0.0.1:8166'+(route==='/'?'/':route+'/'));await page.waitForTimeout(300);await page.locator('h1').first().waitFor({timeout:10000}).catch(()=>{}); result.routes.push({route,title:await page.title(),h1:await page.locator('h1').allTextContents(),main:await page.locator('main').count(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});}
 for(const width of [320,360,375,390,430,768,1024,1280,1440,1920]){await page.setViewportSize({width,height:900});for(const route of ['/','/fr/formation','/fr/ressources','/fr/concevoir-un-essai']){await page.goto('http://127.0.0.1:8166'+route);await page.locator('h1').first().waitFor();await page.waitForTimeout(150);result.widths.push({width,route,overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)});if([320,390,1280].includes(width))await page.screenshot({path:`/downloads/quality-${width}-${route==='/'?'home':route.split('/').pop()}.png`,fullPage:true});}}
 await page.setViewportSize({width:390,height:844});for(const route of ['/','/fr/formation','/fr/ressources','/fr/probleme']){await page.goto('http://127.0.0.1:8166'+route);await page.locator('h1').first().waitFor();const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();result.axe.push({route,violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))}))});}
 result.externalRequests=[...new Set(requests.filter(u=>!u.startsWith('http://127.0.0.1:8166')))];
}finally{fs.writeFileSync('/tmp/cn-quality-browser.json',JSON.stringify(result,null,2));await browser.close();server.kill()}
console.log(JSON.stringify({routes:result.routes.length,routeIssues:result.routes.filter(r=>r.h1.length!==1||r.overflow>1),overflow:result.widths.filter(r=>r.overflow>1),axe:result.axe.map(a=>({route:a.route,violations:a.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length}))})),errors,failed,external:result.externalRequests},null,2));
