

describe("login tests", () => {

    beforeEach(() => {
        cy.visit("/login");
    })

    it('should login with valid credentials', () => {
        cy.location('pathname').should('eq', '/login');
        cy.contains('h1', 'Login').should('be.visible');

        cy.get('input[name="email"]').should('be.visible').as('emailInput')
        cy.get('@emailInput').should('have.attr', 'type', 'email');
        cy.get('@emailInput').type('bkemboi590@gmail.com')


        cy.get('input[name="password"]').should('be.visible').as('passwordInput')
        cy.get('@passwordInput').should('have.attr', 'type', 'password');
        cy.get('@passwordInput').type('123456')

        cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').as('loginButton')

        cy.get('@loginButton').click();

        cy.contains(/Login successful/i).should('be.visible');

        cy.location('pathname').should('eq', '/admin/dashboard/todos')
    });

    // negative test case
    it('should show error with invalid credentials', () => {
        cy.contains('h1', 'Login').should('be.visible');
        cy.get('input[name="email"]').should('be.visible').as('emailInput')

        cy.get('@emailInput').type('bkemboi590@gmail.com')
        cy.get('input[name="password"]').should('be.visible').as('passwordInput')

        cy.get('@passwordInput').type('wrongpassword')
        cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').as('loginButton')
        cy.get('@loginButton').click();
        cy.contains(/Invalid credentials/i).should('be.visible');
        cy.location('pathname').should('eq', '/login');
    });

    // validation test cases
    it('should show validation errors for empty email field', () => {
        cy.contains('h1', 'Login').should('be.visible');
        cy.get('[data-test="login-password-input"]').type('123456')
        cy.get('[data-test="login-submit-button"]').should('be.visible').click();
        cy.contains(/Email is required/i).should('be.visible');
    });

    it('should show validation errors for empty password field', () => {
        cy.contains('h1', 'Login').should('be.visible');
        cy.get('[data-test="login-email-input"]').type('bkemboi590@gmail.com')
        cy.get('[data-test="login-submit-button"]').should('be.visible').click();
        cy.contains(/Min 6 characters/i).should('be.visible');
    });

    it('should show validation errors for all empty fields', () => {
        cy.contains('h1', 'Login').should('be.visible');
        cy.get('[data-test="login-submit-button"]').should('be.visible').click();
        cy.contains(/Email is required/i).should('be.visible');
        cy.contains(/Min 6 characters/i).should('be.visible');
        cy.location('pathname').should('eq', '/login');
    });

    it('should show error for password less than 6 characters', () => {
        cy.get('[data-test="login-email-input"]').type('bkemboi590@gmail.com')
        cy.get('[data-test="login-password-input"]').type('12345')
        cy.get('[data-test="login-submit-button"]').click();
        cy.contains(/Min 6 characters/i).should('be.visible');
    });
})