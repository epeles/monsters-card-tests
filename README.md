# Monster Card Testing Project

This project contains automated tests for a Monster Card application using Cypress.

## Project Structure

The project is organized as follows:

- `cypress/`: Contains all Cypress-related files and folders.
  - `fixtures/`: Contains test data files.
  - `integration/`: Contains test specifications.
  - `plugins/`: Contains custom plugins.
  - `support/`: Contains support files and custom commands.
- `cypress.json`: Configuration file for Cypress.
- `package.json`: Contains project dependencies and scripts.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Running Tests

To run the tests, use the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner, where you can run the tests interactively.

Alternatively, to run the tests in headless mode, use the following command:

```bash
npx cypress run
```

## Writing Tests

To write a new test, create a new file in the `cypress/integration/` folder with a `.spec.js` extension. Use the Cypress API to write your test cases.

For example:

```javascript
describe('Monster Card', () => {
  it('should display the correct title', () => {
    cy.visit('/');
    cy.contains('h1', 'Monster Card');
  });
});
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
