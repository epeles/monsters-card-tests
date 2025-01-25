const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "fvtch4",
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
});