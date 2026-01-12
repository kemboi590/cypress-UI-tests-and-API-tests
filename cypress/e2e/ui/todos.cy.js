describe("Todo tests", () => {
    beforeEach(() => {
        cy.loginAsAdmin();
    });

    it("veiw todos", () => {
        cy.location('pathname').should('eq', '/admin/dashboard/todos');
    })
})