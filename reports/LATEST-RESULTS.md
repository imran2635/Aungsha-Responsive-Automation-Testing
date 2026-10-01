# Latest Playwright results — Aungsha staging

**Date:** 1 Oct 2026  
**Command:** `npx playwright test` (all browser + viewport projects)  
**Duration:** 26.6 minutes  
**Exit code:** 1 (failures present)

---

## Totals

| Status | Count |
|--------|------:|
| Passed | 216 |
| Failed | 48 |
| Flaky | 10 |
| Skipped | 70 |
| **Total** | **344** |

---

## Failures by project

| Project | Failed |
|---------|-------:|
| chromium | 4 |
| chrome | 5 |
| edge | 4 |
| firefox | 6 |
| webkit | 24 |
| mobile-iphone | 1 |
| tablet-ipad | 4 |
| mobile-375 / 390 / android / tablet-768 / desktop-1366 / desktop-1920 | 0 |

---

## Full failure list

### chromium
1. `tests/validation/links.spec.js` — homepage internal links return non-error HTTP status  
2. `tests/validation/page-health.spec.js` — homepage has correct title and key landmarks  
3. `tests/validation/page-health.spec.js` — homepage has no horizontal overflow at desktop size  
4. `tests/validation/page-health.spec.js` — homepage health helpers pass  

### chrome
1. `tests/homepage/buttons.spec.js` — footer newsletter accepts email input  
2. `tests/homepage/homepage.spec.js` — loads with correct title and URL  
3. `tests/validation/images.spec.js` — homepage images load without broken assets  
4. `tests/validation/links.spec.js` — footer internal links have valid hrefs  
5. `tests/validation/links.spec.js` — homepage internal links return non-error HTTP status  

### edge
1. `tests/homepage/buttons.spec.js` — homepage primary buttons/links are enabled and actionable  
2. `tests/homepage/buttons.spec.js` — support menu button is present  
3. `tests/homepage/buttons.spec.js` — footer newsletter accepts email input  
4. `tests/homepage/homepage.spec.js` — loads with correct title and URL  

### firefox
1. `tests/auth/auth-pages.spec.js` — Empty login stays on sign-in  
2. `tests/auth/auth-pages.spec.js` — Create account goes to sign-up  
3. `tests/homepage/homepage.spec.js` — Explore Projects CTA navigates to projects  
4. `tests/homepage/mobile-menu.spec.js` — mobile Marketplace link navigates  
5. `tests/homepage/navbar.spec.js` — About Us link navigates correctly  
6. `tests/validation/links.spec.js` — internal navbar links resolve to expected routes  

### webkit
1. Auth forms — newsletter empty / well-formed email  
2. Homepage — title, hero, headings, Explore Projects, Sign Up  
3. Buttons — primary CTAs, support menu, footer newsletter  
4. Navbar — all desktop links + language switcher  
5. Mobile menu — hidden on desktop  
6. Public — home hero CTAs, navbar hrefs  
7. Validation — images, navbar/footer/social links, page health  

### mobile-iphone
1. `tests/responsive/layouts.spec.js` — footer remains reachable and visible after scroll  

### tablet-ipad
1. Hero and primary CTAs remain visible  
2. Navbar behavior matches breakpoint  
3. Footer remains reachable and visible after scroll  
4. Important hero text is not cut off  

---

## Flaky (passed on retry)

- chromium — Forgot password email tab  
- chrome — Empty login stays on sign-in  
- edge — homepage internal links HTTP status  
- firefox — Sign Up CTA, mobile Projects, mobile Login, desktop Login, images  
- webkit — Forgot password link  
- mobile-414 — footer scroll  

---

## How to regenerate

```powershell
npm.cmd test
npm.cmd run report
# Then refresh this file / README "Latest test run results" section from the console summary
```

Local HTML report (not committed): `reports/html/index.html`
