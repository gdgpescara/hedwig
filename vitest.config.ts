/// <reference types="vitest" />
import { getViteConfig } from "astro/config";
import GithubActionsReporter from "vitest-github-actions-reporter";

export default getViteConfig({
  test: {
    dir: "./src",
    reporters: process.env.GITHUB_ACTIONS
      ? new GithubActionsReporter()
      : "default",
  },
});
