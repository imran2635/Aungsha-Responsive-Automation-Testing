# Aungsha Responsive Automation Testing

Playwright **JavaScript** E2E (POM + OOP) for [staging.aungsha.com](https://staging.aungsha.com/).

**Coverage:** Chromium · Chrome · Edge · Firefox · WebKit · mobile / tablet / desktop · auth · public · dashboard

---

## Setup

```powershell
npm.cmd install
npx.cmd playwright install
npx.cmd playwright install chrome msedge
Copy-Item .env.example .env
# Set AUNGSHA_EMAIL / AUNGSHA_PASSWORD for dashboard + login tests
```
---

## Run commands

```powershell
npm.cmd test                          # all (headless)
npm.cmd run test:headed               # all (browser visible)
npm.cmd run test:ui

npm.cmd run test:chromium
npm.cmd run test:chrome
npm.cmd run test:edge
npm.cmd run test:firefox
npm.cmd run test:webkit

npm.cmd run test:mobile               # 375, 390, 414, Android, iPhone
npm.cmd run test:tablet               # 768, iPad
npm.cmd run test:desktop              # 1366, 1920 + chromium/chrome/edge
npm.cmd run test:responsive

npm.cmd run test:homepage
npm.cmd run test:public
npm.cmd run test:auth
npm.cmd run test:dashboard
npm.cmd run test:links
npm.cmd run test:images

npm.cmd run report
npm.cmd run codegen
```

One browser headed: `npm.cmd run test:chromium -- --headed`  
Or: `$env:HEADLESS='false'`

---

## Structure

```
config/          env + viewports
pages/           BasePage · public · auth · dashboard
components/      Navbar · Footer · Sidebar · modals
tests/           homepage · auth · public · dashboard · responsive · validation
fixtures/        page objects + cookie consent
utils/  test-data/  reports/
```

POM: selectors in page classes · fixtures inject pages · sizes only in `config/viewports.js`.  
On fail: screenshot + video in `reports/test-results/` · trace on retry.
