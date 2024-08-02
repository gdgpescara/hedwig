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
  const manifest = lighthouseOutputs.manifest;
  const [[testedUrl, reportUrl]] = Object.entries(lighthouseOutputs.links);

  const runs = manifest.length;
  let metrics = {
    "performance" : new Array(),
    "accessibility" : new Array(),
    "bestpractices" : new Array(),
    "seo" : new Array()
  };

  manifest.map(m => m.summary)
    .forEach(summary => {
        metrics["performance"].push(summary.performance);
        metrics["accessibility"].push(summary.accessibility);
        metrics["bestpractices"].push(summary["best-practices"]);
        metrics["seo"].push(summary.seo);
    });

  let comment = `
  
  ### ⚡️🏠 Lighthouse report

We ran Lighthouse against the changes and produced this [report](${reportUrl}). Here's the summary:

| Category | Score |
| -------- | ----- |
${scoreRow('Performance', metrics.performance.reduce((acc, p) => acc + p, 0) / metrics.performance.length)}
${scoreRow('Accessibility', Math.max(...metrics.accessibility))}
${scoreRow('Best practices', Math.max(...metrics.bestpractices))}
${scoreRow('SEO', Math.max(...metrics.seo))}

*Lighthouse ran against [${testedUrl}](${testedUrl})*


`;

  return comment;
}

module.exports = ({ lighthouseOutputs }) => {
  return makeComment(lighthouseOutputs);
};