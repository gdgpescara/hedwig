const { setupGitHubSecrets } = require("./setup-github-secrets");

const seeds = [setupGitHubSecrets];

module.exports = {
  seeds,
};
