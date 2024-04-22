const { setupGitHubSecrets } = require("./setup-github-secrets");
const { createOrganizerAccount } = require("./create-organizer-account");

const seeds = [setupGitHubSecrets, createOrganizerAccount];

module.exports = {
  seeds,
};
