/**
 * All routes discovered from Responsive Screenshort-Image screenshots.
 * Keep paths here so page objects and tests do not hard-code URLs in multiple places.
 */
const routes = Object.freeze({
  // Public marketing / browse pages
  home: '/en',
  projects: '/en/projects',
  marketplace: '/en/marketplace',
  about: '/en/about',
  signIn: '/en/sign-in',
  signUp: '/en/sign-up',
  forgotPassword: '/en/forgot-password',

  // Authenticated dashboard pages (left sidebar)
  dashboard: '/en/dashboard',
  portfolio: '/en/dashboard/my-portfolio',
  myListings: '/en/dashboard/sell-shares',
  wishlist: '/en/dashboard/wishlist',
  funds: '/en/dashboard/my-points',
  referralRewards: '/en/dashboard/referral-rewards',
  support: '/en/dashboard/support',
  supportTickets: '/en/dashboard/support/tickets',
  transactions: '/en/dashboard/transactions',
  profile: '/en/dashboard/my-profile',
});

/** URL / title patterns used by assertions */
const publicPages = Object.freeze({
  home: { path: routes.home, title: /Aungsha/i, url: /\/en(?:\/)?(?:\?|$)/ },
  projects: { path: routes.projects, title: /Project|Aungsha/i, url: /\/en\/projects/ },
  marketplace: { path: routes.marketplace, title: /Marketplace|Aungsha/i, url: /\/en\/marketplace/ },
  about: { path: routes.about, title: /About|Aungsha/i, url: /\/en\/about/ },
  signIn: { path: routes.signIn, title: /Sign in/i, url: /\/en\/sign-in/ },
  signUp: { path: routes.signUp, title: /Sign|Aungsha/i, url: /\/en\/sign-up/ },
  forgotPassword: { path: routes.forgotPassword, title: /Forgot|Aungsha/i, url: /\/en\/forgot-password/ },
  dashboard: { path: routes.dashboard, title: /Dashboard|Aungsha/i, url: /\/en\/dashboard(?:\?|$)/ },
  portfolio: { path: routes.portfolio, title: /Portfolio|Aungsha/i, url: /\/en\/dashboard\/my-portfolio/ },
  myListings: { path: routes.myListings, title: /Listing|Aungsha/i, url: /\/en\/dashboard\/sell-shares/ },
  wishlist: { path: routes.wishlist, title: /Wishlist|Aungsha/i, url: /\/en\/dashboard\/wishlist/ },
  funds: { path: routes.funds, title: /Fund|Point|Aungsha/i, url: /\/en\/dashboard\/my-points/ },
  referralRewards: { path: routes.referralRewards, title: /Referral|Aungsha/i, url: /\/en\/dashboard\/referral-rewards/ },
  support: { path: routes.support, title: /Support|Aungsha/i, url: /\/en\/dashboard\/support/ },
  transactions: { path: routes.transactions, title: /Transaction|Aungsha/i, url: /\/en\/dashboard\/transactions/ },
  profile: { path: routes.profile, title: /Profile|Aungsha/i, url: /\/en\/dashboard\/my-profile/ },
});

module.exports = { routes, publicPages };
