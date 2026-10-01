const { env } = require('../config/env');

const users = Object.freeze({
  valid: {
    email: env.email,
    password: env.password,
  },
  invalid: {
    email: 'invalid-user@example.com',
    password: 'WrongPassword123!',
  },
});

const hasValidCredentials = () => Boolean(users.valid.email && users.valid.password);

module.exports = { users, hasValidCredentials };
