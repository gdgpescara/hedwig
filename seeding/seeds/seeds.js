const { uploadSecrets } = require("./github-secrets");

const seeds = [
  {
    key: "setGithubSecrets",
    description: "\x1b[1mSet Github secrets\x1b[0m",
    execute: uploadSecrets,
  },
];

module.exports = {
  seeds,
};
