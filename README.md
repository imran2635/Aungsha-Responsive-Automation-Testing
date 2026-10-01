# Aungsha Responsive Automation Testing

Playwright **JavaScript** E2E framework for [staging.aungsha.com](https://staging.aungsha.com/).

| | |
|---|---|
| **Stack** | Playwright Test · Node.js · Page Object Model · OOP |
| **Target** | Staging (`https://staging.aungsha.com`) |
| **Coverage** | Cross-browser · Responsive viewports · Auth · Public · Dashboard |

---

## Latest test run results

> **Run date:** 1 Oct 2026 · **Duration:** 26.6 minutes · **Mode:** headless · **All projects**

### Summary

| Status | Count |
|--------|------:|
| ✅ Passed | **216** |
| ❌ Failed | **48** |
| ⚠️ Flaky (passed on retry) | **10** |
| ⏭️ Skipped | **70** |
| **Total** | **344** |

**Pass rate (executed, excluding skips):** ~82% · **Overall (incl. skips):** ~63%

> Skipped tests are mostly **dashboard / valid-login** cases that need `AUNGSHA_EMAIL` and `AUNGSHA_PASSWORD` in `.env`.

### Browsers

| Project | Failed | Notes |
|---------|-------:|-------|
| Chromium | 4 | Validation (links HTTP, page health) |
| Google Chrome | 5 | Homepage / footer / links / images |
| Microsoft Edge | 4 | Homepage buttons & title |
| Firefox | 6 | Auth, nav, mobile menu, links |
| WebKit (Safari) | **24** | Heaviest failures — homepage, navbar, validation |

### Responsive viewports

| Project | Size / profile | Result |
|---------|----------------|--------|
| `mobile-375` | 375×667 | ✅ All passed |
| `mobile-390` | 390×844 | ✅ All passed |
| `mobile-414` | 414×896 | ⚠️ 1 flaky (footer scroll) |
| `mobile-android` | Pixel 7 profile | ✅ All passed |
| `mobile-iphone` | iPhone 14 profile | ❌ 1 fail (footer scroll) |
| `tablet-768` | 768×1024 | ✅ All passed |
| `tablet-ipad` | iPad Pro profile | ❌ 4 fails (hero, navbar, footer, text) |
| `desktop-1366` | 1366×768 | ✅ All passed |
| `desktop-1920` | 1920×1080 | ✅ All passed |

### Failed tests (by area)

<details>
<summary><strong>Chromium (4)</strong></summary>

- Validation — homepage internal links HTTP status  
- Validation — page health (title / landmarks)  
- Validation — no horizontal overflow  
- Validation — homepage health helpers  

</details>

<details>
<summary><strong>Chrome (5)</strong></summary>

- Buttons — footer newsletter accepts email  
- Homepage — loads with correct title and URL  
- Validation — images / footer links / internal links HTTP  

</details>

<details>
<summary><strong>Edge (4)</strong></summary>

- Buttons — primary CTAs / support menu / footer newsletter  
- Homepage — loads with correct title and URL  

</details>

<details>
<summary><strong>Firefox (6)</strong></summary>

- Auth — empty login / create account  
- Homepage — Explore Projects CTA  
- Mobile menu — Marketplace link  
- Navbar — About Us  
- Validation — navbar link routes  

</details>

<details>
<summary><strong>WebKit (24)</strong></summary>

- Auth forms (newsletter)  
- Homepage (title, hero, CTAs, headings)  
- Navbar (all desktop links + language)  
- Mobile menu hidden on desktop  
- Public pages (home, navbar hrefs)  
- Validation (images, links, page health)  

</details>

<details>
<summary><strong>Responsive (5)</strong></summary>

- `mobile-iphone` — footer reachable after scroll  
- `tablet-ipad` — hero CTAs / navbar / footer / hero text cut-off  

</details>

### Reports & logs

| Artifact | Path | On GitHub? |
|----------|------|------------|
| Results summary (this run) | [`reports/LATEST-RESULTS.md`](reports/LATEST-RESULTS.md) | ✅ Yes |
| HTML report | `reports/html/` | ❌ Local only (gitignored) |
| Full console log | `reports/full-run.log` | ❌ Local only |

Open the HTML report after a local run:

```powershell
npm.cmd run report
```

---

## Quick start

```powershell
Set-Location 'e:\Aungsha-Responsive-Automation-Testing'
npm.cmd install
npx.cmd playwright install
npx.cmd playwright install chrome msedge
Copy-Item .env.example .env
# Set AUNGSHA_EMAIL / AUNGSHA_PASSWORD for dashboard + login success tests
```

---

## How to run tests

First open the project folder:

```powershell
Set-Location 'e:\Aungsha-Responsive-Automation-Testing'
```

### All projects

```powershell
npm.cmd test                 # everything (browsers + viewports), headless
npm.cmd run test:headed      # everything, browser window open
npm.cmd run test:ui          # Playwright UI mode
```

### By browser

```powershell
npm.cmd run test:chromium
npm.cmd run test:chrome
npm.cmd run test:edge
npm.cmd run test:firefox
npm.cmd run test:webkit
```

### By viewport

```powershell
npm.cmd run test:mobile      # 375×667, 390×844, 414×896, Android, iPhone
npm.cmd run test:tablet      # 768×1024, iPad
npm.cmd run test:desktop     # 1366×768, 1920×1080 (+ chromium/chrome/edge)
npm.cmd run test:responsive  # responsive specs only (all viewport projects)
```

### By feature

```powershell
npm.cmd run test:homepage
npm.cmd run test:public
npm.cmd run test:auth
npm.cmd run test:dashboard   # needs AUNGSHA_EMAIL / AUNGSHA_PASSWORD in .env
npm.cmd run test:links
npm.cmd run test:images
```

### See the browser window (headed)

```powershell
npm.cmd run test:chromium -- --headed
npm.cmd run test:chrome -- --headed
npm.cmd run test:edge -- --headed
npm.cmd run test:firefox -- --headed
npm.cmd run test:webkit -- --headed

# or for the whole session:
$env:HEADLESS='false'
npm.cmd run test:chromium
```

### Report & codegen

```powershell
npm.cmd run report           # open HTML report (reports/html)
npm.cmd run codegen          # record actions against staging
```

### Full command cheat sheet

| Command | What it runs |
|---------|--------------|
| `npm.cmd test` | All projects |
| `npm.cmd run test:headed` | All projects, headed |
| `npm.cmd run test:ui` | UI mode |
| `npm.cmd run test:chromium` | Chromium only |
| `npm.cmd run test:chrome` | Google Chrome only |
| `npm.cmd run test:edge` | Microsoft Edge only |
| `npm.cmd run test:firefox` | Firefox only |
| `npm.cmd run test:webkit` | WebKit / Safari only |
| `npm.cmd run test:mobile` | Mobile viewports |
| `npm.cmd run test:tablet` | Tablet viewports |
| `npm.cmd run test:desktop` | Desktop viewports + Chromium/Chrome/Edge |
| `npm.cmd run test:responsive` | Responsive suite |
| `npm.cmd run test:homepage` | Homepage specs |
| `npm.cmd run test:public` | Public + homepage specs |
| `npm.cmd run test:auth` | Auth specs |
| `npm.cmd run test:dashboard` | Dashboard specs |
| `npm.cmd run test:links` | Link validation |
| `npm.cmd run test:images` | Image validation |
| `npm.cmd run report` | Open HTML report |
| `npm.cmd run codegen` | Playwright codegen |

---

## Project layout

```
Aungsha-Responsive-Automation-Testing/
├── config/                 # env + viewport matrix
├── pages/                  # BasePage + public / auth / dashboard
├── components/             # Navbar, Footer, Sidebar, modals, …
├── tests/
│   ├── homepage/
│   ├── auth/
│   ├── public/
│   ├── dashboard/          # needs .env credentials
│   ├── responsive/
│   └── validation/
├── fixtures/               # shared page objects + cookie consent
├── utils/
├── test-data/
├── reports/                # HTML + results (runtime)
├── playwright.config.js
└── README.md
```

---

## Architecture (short)

| Piece | Role |
|-------|------|
| **BasePage** | Shared navigation & asserts (no hard sleeps) |
| **Page objects** | One class per screen; selectors stay inside |
| **Components** | Reusable Navbar / Sidebar / Footer / forms |
| **Fixtures** | Tests receive ready page objects |
| **viewports.js** | Single matrix → Playwright projects |
| **Browser projects** | chromium · chrome · edge · firefox · webkit |
| **Responsive projects** | Only `tests/responsive/` (avoids N×M explosion) |

Cookie consent is pre-set: `aungsha_cookie_consent=accepted`.

---

## Artifacts on failure

| Artifact | When |
|----------|------|
| Screenshot | Fail only → `reports/test-results/**` |
| Video | Fail only |
| Trace | On first retry → open with `npx playwright show-trace …` |
| HTML report | Every run → `npm run report` |

---

## Add a new page / test

1. Create a page class under `pages/…` extending `BasePage`.
2. Register it in `fixtures/test.fixture.js`.
3. Add a thin spec under `tests/…` using the fixture.

```javascript
const { test, expect } = require('../../fixtures/test.fixture');

test('home hero is visible', async ({ homePage }) => {
  await homePage.open();
  await expect(homePage.heroHeading).toBeVisible();
});
```

New viewport? Add once in `config/viewports.js` — projects are generated automatically.

---

## Coverage map

- Homepage, navbar, mobile menu, primary CTAs  
- Login / signup / forgot password / forms  
- Public: Projects, Marketplace, About  
- Dashboard sidebar pages (login required)  
- Responsive layouts + overflow checks  
- Links + images validation  
- Cross-browser: Chromium, Chrome, Edge, Firefox, WebKit  
