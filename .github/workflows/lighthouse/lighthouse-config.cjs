module.exports = {
    extends: 'lighthouse:default',
    settings: {
      skipAudits: [
        'canonical', 
        'maskable-icon',
        'valid-source-maps',
        'unsized-images',
        'offline-start-url',
      ],
    },
  };