// Import BasePage class
const BasePage = require('./BasePage').default;

// Monster page class extending BasePage
class MonsterPage extends BasePage {
    // Initialize the page with base URL
    constructor() {
        super();
        this.url = 'http://localhost:3000/';
    }

    // Object containing all page selectors
    selectors = {
        dynamicTitle: '[data-testid="dynamic-title"]',         // Title that changes based on monster count
        createButton: '[data-testid="btn-create-monster"]',    // Button to create new monster
        deleteButton: '[data-testid="btn-delete"]',           // Button to delete monster
        monsterCard: '[data-testid="monster-card"]',          // Container for monster card
        nameInput: 'input[name="name"]',                      // Input field for monster name
        hpInput: 'input[name="hp"]',                         // Input field for HP
        attackInput: 'input[name="attack"]',                 // Input field for attack
        defenseInput: 'input[name="defense"]',               // Input field for defense
        speedInput: 'input[name="speed"]',                   // Input field for speed
        alertMessage: '[data-testid="alert-required-fields"]', // Alert for required fields
        monsterImage: '[data-testid="monster-image"]',         // Monster image element
        favoriteButton: '[data-testid="favorite-btn"]'         // Favorite button element
    };

    // Navigate to monster page
    visitPage() {
        this.visit(this.url);
    }

    // Get dynamic title element
    getDynamicTitle() {
        return this.getElement(this.selectors.dynamicTitle);
    }

    // Get specific monster card by test ID
    getMonsterCard(testId) {
        return this.getElement(`[data-testid="${testId}"]`);
    }

    // Fill monster creation form
    fillMonsterForm(monster) {
        this.getElement(this.selectors.nameInput).type(monster.name);      // Fill name
        this.getElement(this.selectors.hpInput).type(monster.hp);         // Fill HP
        this.getElement(this.selectors.attackInput).type(monster.attack); // Fill attack
        this.getElement(this.selectors.defenseInput).type(monster.defense); // Fill defense
        this.getElement(this.selectors.speedInput).type(monster.speed);    // Fill speed
    }

    // Verify hover effect on monster card
    verifyHoverEffect(testId) {
        return this.getMonsterCard(testId)
            .trigger('mouseover')
            .should('have.css', 'transition', '0.2s ease-in-out');
    }

    // Verify click effect on monster card
    verifyClickEffect(testId) {
        return this.getMonsterCard(testId)
            .click()
            .should('have.css', 'border', '1px solid rgb(0, 0, 0)');
    }

    // Create a new monster
    createMonster(monster) {
        this.getElement(this.selectors.createButton).click();              // Open create form
        this.verifyHoverEffect(monster.testId);                           // Check hover effect
        this.verifyClickEffect(monster.testId);                           // Check click effect
        this.fillMonsterForm(monster);                                    // Fill form
        this.getElement(this.selectors.createButton)                      // Submit form
            .should('be.enabled')
            .click();
    }

    // Verify monster details
    verifyMonster(monster, index) {
        // Verify monster name
        cy.get('[data-testid="card-monster-name"]')
            .eq(index)
            .should('have.text', monster.name);
    
        // Verify HP value
        cy.get('[data-testid="card-monster-hp"]')
            .eq(index)
            .should('have.attr', 'aria-valuenow', monster.hp);
    
        // Verify attack value
        cy.get('[data-testid="card-monster-attack"]')
            .eq(index)
            .should('have.attr', 'aria-valuenow', monster.attack);
    
        // Verify defense value
        cy.get('[data-testid="card-monster-defense"]')
            .eq(index)
            .should('have.attr', 'aria-valuenow', monster.defense);
    
        // Verify speed value
        cy.get('[data-testid="card-monster-speed"]')
            .eq(index)
            .should('have.attr', 'aria-valuenow', monster.speed);
    
        // Verify favorite button toggle functionality
        this.verifyFavoriteToggle(index);  // Add favorite verification

        // Verify monster image
        this.verifyMonsterImage(index);
    }

    // Verify favorite button toggle functionality
    verifyFavoriteToggle(index) {
        // Click favorite and verify red color
        cy.get(this.selectors.favoriteButton)
            .eq(index)
            .click()
            .should('have.css', 'color', 'rgb(255, 0, 0)');  // red in RGB

        // Click again and verify removal of red color
        cy.get(this.selectors.favoriteButton)
            .eq(index)
            .click()
            .should('not.have.css', 'color', 'rgb(255, 0, 0)');
    }

    // Verify monster image exists and loads correctly
    verifyMonsterImage(index) {
        cy.get('[data-testid="monster-image"]')
            .eq(index)
            .should('be.visible')
            .invoke('attr', 'src')
            .then(imageUrl => {
                cy.request(imageUrl).its('status').should('eq', 200);
            });
    }

    // Delete first monster in list
    deleteMonster() {
        this.getElement(this.selectors.deleteButton).first().click();
    }

    // Recursively delete all monsters
    deleteAllMonsters() {
        cy.get('body').then($body => {
            if ($body.find(this.selectors.monsterCard).length) {  // If monsters exist
                this.deleteMonster();                             // Delete one
                this.deleteAllMonsters();                         // Recurse
            }
        });
    }

    // Verify total number of monsters
    verifyMonsterCount(count) {
        this.getElement(this.selectors.monsterCard).should('have.length', count);
    }

    // Verify required fields validation
    verifyRequiredFieldsAlert() {
        this.getElement(this.selectors.createButton).click();           // Try to create
        this.getElement(this.selectors.alertMessage)                    // Check error
            .should('be.visible')
            .and('have.text', 'All fields are required');
    }

    // Verify numeric field validation
    verifyNumericFieldValidation() {
        const nonNumericValue = 'abc';                                  // Invalid input
        const numericFields = [                                         // All numeric fields
            this.selectors.hpInput,
            this.selectors.attackInput,
            this.selectors.defenseInput,
            this.selectors.speedInput
        ];

        numericFields.forEach(field => {
            this.getElement(field).type(nonNumericValue);              // Type invalid value
            this.getElement(this.selectors.alertMessage)               // Check error
                .should('be.visible')
                .and('have.text', 'Please enter a valid number');
            this.getElement(field).clear();                           // Clear field
        });
    }
}

// Export the MonsterPage class
module.exports = { default: MonsterPage };