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
 * @typedef {Object} LighthouseOutputs
 * @prop {Record<string, string>} links
 * @prop {Manifest[]} manifest
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
  const s1 = lighthouseOutputs.manifest[1].summary;
  const s2 = lighthouseOutputs.manifest[2].summary;
  const s3 = lighthouseOutputs.manifest[3].summary;
  const s4 = lighthouseOutputs.manifest[4].summary;
  const [[testedUrl, reportUrl]] = Object.entries(lighthouseOutputs.links);

  const comment = `## ⚡️🏠 Lighthouse report

We ran Lighthouse against the changes and produced this [report](${reportUrl}). Here's the summary:

| Category | Score |
| -------- | ----- |
${scoreRow('Performance', summary.performance)}
${scoreRow('Accessibility', summary.accessibility)}
${scoreRow('Best practices', summary['best-practices'])}
${scoreRow('SEO', summary.seo)}
${scoreRow('Performance', s1.performance)}
${scoreRow('Accessibility', s1.accessibility)}
${scoreRow('Best practices', s1['best-practices'])}
${scoreRow('SEO', s1.seo)}
${scoreRow('Performance', s2.performance)}
${scoreRow('Accessibility', s2.accessibility)}
${scoreRow('Best practices', s2['best-practices'])}
${scoreRow('SEO', s2.seo)}
${scoreRow('Performance', s3.performance)}
${scoreRow('Accessibility', s3.accessibility)}
${scoreRow('Best practices', s3['best-practices'])}
${scoreRow('SEO', s3.seo)}
${scoreRow('Performance', s4.performance)}
${scoreRow('Accessibility', s4.accessibility)}
${scoreRow('Best practices', s4['best-practices'])}
${scoreRow('SEO', s4.seo)}

*Lighthouse ran against [${testedUrl}](${testedUrl})*
`;

  return comment;
}

module.exports = ({ lighthouseOutputs }) => {
  return makeComment(lighthouseOutputs);
};