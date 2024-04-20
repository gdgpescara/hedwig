const uploadSecrets = async () => {
  console.log(
    "\x1b[36m",
    `
  ╔═╗┌─┐┌┬┐┬ ┬┌─┐  ╔═╗┬┌┬┐╦ ╦┬ ┬┌┐   ┌─┐┌─┐┌─┐┬─┐┌─┐┌┬┐┌─┐
  ╚═╗├┤  │ │ │├─┘  ║ ╦│ │ ╠═╣│ │├┴┐  └─┐├┤ │  ├┬┘├┤  │ └─┐
  ╚═╝└─┘ ┴ └─┘┴    ╚═╝┴ ┴ ╩ ╩└─┘└─┘  └─┘└─┘└─┘┴└─└─┘ ┴ └─┘                                                                      
`,
    "\x1b[0m",
  );
};

const setupGitHubSecrets = {
  key: "setupGitHubSecretsSeed",
  description: "\x1b[1mSetup GitHub secrets\x1b[0m",
  execute: uploadSecrets,
};

module.exports = {
  setupGitHubSecrets,
};
