import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir:'./e2e',timeout:30000,workers:1,
 reporter:[['list'],['json',{outputFile:'test-results/e2e-results.json'}]],
 use:{baseURL:'http://127.0.0.1:8170',trace:'retain-on-failure',...devices['Desktop Chrome'],launchOptions:{executablePath:process.env.CHROME_BIN || '/usr/bin/google-chrome',args:['--no-sandbox','--disable-dev-shm-usage']},serviceWorkers:'block'},
 webServer:{command:'python3 -m http.server 8170 --directory dist/public',url:'http://127.0.0.1:8170',reuseExistingServer:false,timeout:30000},
});
