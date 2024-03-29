module.exports = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: [
        'performance',
        'accessibility',
        'best-practices',
        'seo',
      ],
      skipAudits: [
        'canonical', 
        'maskable-icon',
        'valid-source-maps',
        'unsized-images',
        'offline-start-url',
      ],
    },
  };