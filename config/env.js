const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const toBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return String(value).toLowerCase() === 'true';
};

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = Object.freeze({
  baseURL: process.env.BASE_URL || 'https://staging.aungsha.com',
  headless: toBool(process.env.HEADLESS, true),
  slowMo: toNumber(process.env.SLOW_MO, 0),
  defaultTimeout: toNumber(process.env.DEFAULT_TIMEOUT, 30_000),
  expectTimeout: toNumber(process.env.EXPECT_TIMEOUT, 10_000),
  navigationTimeout: toNumber(process.env.NAVIGATION_TIMEOUT, 45_000),
  retries: toNumber(process.env.RETRIES, process.env.CI ? 2 : 1),
  workers: process.env.WORKERS ? toNumber(process.env.WORKERS, undefined) : undefined,
  email: process.env.AUNGSHA_EMAIL || '',
  password: process.env.AUNGSHA_PASSWORD || '',
  localePath: '/en',
});

module.exports = { env };
