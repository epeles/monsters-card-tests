// Base class for all page objects
class BasePage {
    // Navigate to a specific URL
    visit(url) {
        cy.visit(url);
    }

    // Get element by CSS selector
    getElement(selector) {
        return cy.get(selector);
    }
}

// Export the BasePage class
module.exports = { default: BasePage };
