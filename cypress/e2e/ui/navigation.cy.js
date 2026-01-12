describe('template spec', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('should visit multiple pages', () => {
    cy.location('pathname').should('eq', '/')
    cy.contains('Welcome').should('be.visible')

    cy.get('[data-test="todo-welcome-header"]').should('contain.text', 'Welcome to TodoPro!')

    // cy.visit('/about')
    // click on the about link on the navbar
    cy.get('.navbar-center ul').contains('About').click()

    cy.location('pathname').should('eq', '/about')

    cy.contains('About TodoPro').should('be.visible')

    cy.get('h1').contains('About TodoPro')
    cy.get('h1').contains(/about todopro/i)
    cy.get('[data-test="todo-about-header"]').should('contain.text', 'About TodoPro')
  })



  it("toggle menu on small screens", () => {
    cy.viewport('iphone-6')

    cy.get('.navbar-start .dropdown .btn.btn-ghost.btn-circle').as('menuButton').should('be.visible')

    cy.get('@menuButton').click()

    cy.get('.menu.menu-sm.dropdown-content').as('ulList').should('be.visible')
    cy.get('@ulList').within(() => {
      cy.contains('Home').should('be.visible')
      cy.get('a[href="/"]').should('contain.text', 'Home')

      // see the first li item has text Home
      cy.get('li').first().should('contain.text', 'Home')
      // second one is About
      cy.get('li').eq(1).should('contain.text', 'About')

      cy.get('li').eq(2).should('contain.text', 'DashBoard')

      cy.get('li').eq(3).should('contain.text', 'Register')

      cy.get('li').eq(4).should('contain.text', 'Login')
    })

  })
})