// @ts-check

/**
 * @typedef {Object} Summary
 * @prop {number} performance
 * @prop {number} accessibility
 * @prop {number} best-practices
 * @prop {number} seo
 * @prop {number} pwa
 */

/**
 * @typedef {Object} Manifest
 * @prop {string} url
 * @prop {boolean} isRepresentativeRun
 * @prop {string} htmlPath
 * @prop {string} jsonPath
 * @prop {Summary} summary
 */

/**
 * @typedef {Object} AssertionResult
 * @prop {string} name
 * @prop {boolean} passed
 * @prop {number} expected
 * @prop {number} actual
 * @prop {number[]} values
 * @prop {string} auditProperty
 * @prop {string} operator
 */

/**
 * @typedef {Object} LighthouseOutputs
 * @prop {Record<string, string>} links
 * @prop {Manifest[]} manifest
 * @prop {AssertionResult[]} assertionResults
 */

const formatScore = (/** @type { number } */ score) => Math.round(score * 100);
const emojiScore = (/** @type { number } */ score) =>
  score >= 0.9 ? '🟢' : score >= 0.5 ? '🟠' : '🔴';

const scoreRow = (
  /** @type { string } */ label,
  /** @type { number } */ score
) => `| ${emojiScore(score)} ${label} | ${formatScore(score)} |`;

/**
 * @param {LighthouseOutputs} lighthouseOutputs
 */
function makeComment(lighthouseOutputs) {
  const { summary } = lighthouseOutputs.manifest[0];
  const [[testedUrl, reportUrl]] = Object.entries(lighthouseOutputs.links);

  let comment = `## ⚡️🏠 Lighthouse report

We ran Lighthouse against the changes and produced this [report](${reportUrl}). Here's the summary:

| Category | Score |
| -------- | ----- |
${scoreRow('Performance', summary.performance)}
${scoreRow('Accessibility', summary.accessibility)}
${scoreRow('Best practices', summary['best-practices'])}
${scoreRow('SEO', summary.seo)}

*Lighthouse ran against [${testedUrl}](${testedUrl})*


`;


const { assertionResults } = lighthouseOutputs;
for (let i = 0; i<assertionResults.length; i++) {
  const result = assertionResults[i];
  comment = comment + `
  ###result ${i}
  name: ${result.name}
  expected: ${result.expected}, actual: ${result.actual}
  values: ${result.values}
  passed: ${result.passed}
  operator: ${result.operator}, property: ${result.auditProperty}

  
  `;
}
  return comment;
}

module.exports = ({ lighthouseOutputs }) => {
  return makeComment(lighthouseOutputs);
};