// For VS Code Extension
module.exports = {
    client: {
      service: {
        name: 'blog',
        // URL to the GraphQL API
        url: 'import.meta.env.VITE_GRAPHCMS_ENDPOINT',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
        'src/**/*.ts',
      ],
    },
  }
