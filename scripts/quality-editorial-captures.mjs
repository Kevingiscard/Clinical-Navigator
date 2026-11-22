import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
const server=spawn('python3',['-m','http.server','8173','--directory','dist/public'],{stdio:'ignore'});
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
try{const context=await browser.newContext({serviceWorkers:'block'});await context.addInitScript(()=>localStorage.setItem('cn_disclaimer_v1','accepted'));const page=await context.newPage();
async function capture(selector,path){await page.evaluate(()=>window.scrollTo(0,0));const box=await page.locator(selector).boundingBox();if(!box)throw new Error('Missing capture target');await page.screenshot({path,clip:box,fullPage:true});}
for(const width of [320,390,1280]){await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8173/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`/downloads/clinical-final-${width}-full.png`,fullPage:true});await page.screenshot({path:`/downloads/clinical-final-${width}-top.png`});
for(const [i,name] of ['02 Les événements','03 La robustesse'].entries()){await page.getByRole('button',{name}).click();await capture('.cn-lesson-panel',`/downloads/clinical-final-${width}-lesson-${i+2}.png`);}
await page.locator('summary').filter({hasText:'Analyse de sensibilité'}).click();await page.getByRole('button',{name:'Non',exact:true}).click();await capture('.cn-primer-bottom',`/downloads/clinical-final-${width}-interactive.png`);
}
const data={reviewed:new Date().toISOString(),widths:[320,390,1280],states:['default','event','robustness','definition-open','quiz-feedback']};fs.writeFileSync('/tmp/clinical-editorial-captures.json',JSON.stringify(data,null,2));await context.close();}finally{await browser.close();server.kill();}
