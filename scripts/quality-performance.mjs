// Controlled local comparison. This is not a field Core Web Vitals report.
import {chromium} from '@playwright/test';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
const servers=[spawn('python3',['-m','http.server','8171','--directory',process.env.CN_BASELINE_DIST || '/tmp/cn-perf-baseline/dist/public'],{stdio:'ignore'}),spawn('python3',['-m','http.server','8172','--directory','dist/public'],{stdio:'ignore'})];
const browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']});
const samples=[];
try{
 for(let run=1;run<=3;run++)for(const [version,port] of [['baseline',8171],['optimized',8172]]){
  const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{localStorage.setItem('cn_disclaimer_v1','accepted');window.__perf={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__perf.lcp=e.startTime;window.__perf.element=e.element?.tagName+' '+e.element?.textContent?.slice(0,100)}}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__perf.cls+=e.value}).observe({type:'layout-shift',buffered:true})});
  const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.clearBrowserCache');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto(`http://127.0.0.1:${port}/`);await page.waitForTimeout(8000);
  const data=await page.evaluate(()=>({observed:window.__perf,navigation:performance.getEntriesByType('navigation').map(e=>({domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd})),resources:performance.getEntriesByType('resource').map(e=>({name:e.name.replace(location.origin,''),start:e.startTime,end:e.responseEnd,bytes:e.transferSize}))}));
  samples.push({version,run,...data,errors});console.log(version,run,JSON.stringify(data.observed),data.resources.reduce((s,r)=>s+r.bytes,0));
  if(version==='optimized'&&run===3)await page.screenshot({path:'/downloads/quality-optimized-home-390.png',fullPage:true});
  await context.close();
 }
}finally{await browser.close();for(const s of servers)s.kill();fs.writeFileSync('/tmp/cn-performance-comparison.json',JSON.stringify({conditions:{viewport:'390x844',latencyMs:150,downloadBytesPerSecond:200000,uploadBytesPerSecond:93750,cpuMultiplier:4,cache:'disabled; new context each sample',serviceWorkers:'blocked',server:'local Python HTTP, no compression',baselineCommit:process.env.CN_BASELINE_COMMIT || 'ff0f1f8',INP:'not measured'},samples},null,2))}
