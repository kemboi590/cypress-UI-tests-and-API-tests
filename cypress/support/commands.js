// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginAsAdmin', (email="bkemboi590@gmail.com", password="123456") => {
    cy.visit("/login");

      cy.location('pathname').should('eq', '/login');
        cy.contains('h1', 'Login').should('be.visible');

        cy.get('input[name="email"]').should('be.visible').as('emailInput')
        cy.get('@emailInput').should('have.attr', 'type', 'email');
        cy.get('@emailInput').type(email)


        cy.get('input[name="password"]').should('be.visible').as('passwordInput')
        cy.get('@passwordInput').should('have.attr', 'type', 'password');
        cy.get('@passwordInput').type(password)

        cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').as('loginButton')

        cy.get('@loginButton').click();

        cy.contains(/Login successful/i).should('be.visible');

        cy.location('pathname').should('eq', '/admin/dashboard/todos')
});


