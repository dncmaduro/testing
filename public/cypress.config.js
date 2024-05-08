const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "778g3u",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },

  viewportWidth: 1280,
  viewportHeight: 720,

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
