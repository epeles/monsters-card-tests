const MonsterPage = require('../support/pages/MonsterPage').default;  // Import page object

// Main test suite
describe('Monster Creation, Verification, and Deletion', () => {
    // Initialize page object
    const monsterPage = new MonsterPage();
    let monsters;

    before(() => {
        // Load monsters data from fixtures
        cy.fixture('monsters.json').then((data) => {
            monsters = data.monsters;
        });
    });

    // Setup before each test
    beforeEach(() => {
        cy.log('Navigating to the monster creation page');           // Log navigation step
        monsterPage.visitPage();                                     // Visit monster page
    });

    // Main test case for monster CRUD operations
    it('should create, verify, and delete monsters', () => {
        cy.log('Step 1: Verifying initial empty state with "no monsters" message');
        monsterPage.getDynamicTitle()                               // Check empty state
            .should('have.text', 'There are no monsters');

        cy.log('Step 2: Creating multiple monsters with different attributes');
        // Create each monster
        monsters.forEach(monster => {
            cy.log(`Creating monster: ${monster.name} with HP:${monster.hp}, ATK:${monster.attack}, DEF:${monster.defense}, SPD:${monster.speed}`);
            monsterPage.createMonster(monster);
        });

        cy.log('Step 3: Verifying all monsters were created successfully');
        monsterPage.verifyMonsterCount(monsters.length);            // Verify count
        monsters.forEach((monster, index) => {                      // Verify each monster
            cy.log(`Verifying monster ${index + 1}: ${monster.name}`);
            monsterPage.verifyMonster(monster, index);
        });

        cy.log('Step 4: Cleaning up by deleting all monsters');
        monsterPage.deleteAllMonsters();                           // Delete all monsters
        
        cy.log('Step 5: Verifying all monsters were deleted successfully');
        monsterPage.getDynamicTitle()                             // Verify empty state
            .should('have.text', 'There are no monsters');
    });

    // Test case for required fields validation
    it('should show validation message when trying to create monster without required fields', () => {
        cy.log('Step 1: Attempting to create a monster without filling required fields');
        monsterPage.verifyRequiredFieldsAlert();                  // Check required fields
        
        cy.log('Step 2: Verifying validation message is displayed');
    });

    // Test case for numeric field validation
    it('should show error when entering non-numeric values in numeric fields', () => {
        cy.log('Step 1: Attempting to create a monster with non-numeric values in numeric fields');
        monsterPage.verifyNumericFieldValidation();               // Check numeric validation
        
        cy.log('Step 2: Verifying numeric validation error message is displayed');
    });
});