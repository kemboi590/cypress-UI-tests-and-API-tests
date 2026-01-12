describe("User signup tests", () => {
    beforeEach(() => {
        cy.visit("/register");
    })

    it("should signup a new user", () => {
        // load the fiture
        cy.fixture('newuser').then((user) => {
            // intercept the api call and mock the response
            cy.intercept('POST', '**/users', {
                statusCode: 201,
                body: {
                    message: "User registered successfully",
                    user: {
                        id: 1,
                        first_name: user.first_name,
                        last_name: user.last_name,
                    }
                }
            }).as('registerUser');

            // Verify we're on the register page
            cy.get('[data-test="todo-registration-header"]').should("contain.text", "Account Registration");

            // Fill in the form using fixture data
            cy.get('[data-test="signup-firstname"]').type(user.first_name);
            cy.get('[data-test="signup-lastname"]').type(user.last_name);
            cy.get('[data-test="signup-email"]').type(user.email);
            cy.get('[data-test="signup-phone"]').type(user.phone_number);
            cy.get('[data-test="signup-password"]').type(user.password);
            cy.get('[data-test="signup-confirmpassword"]').type(user.confirmPassword);

            //  Submit the form
            cy.get('[data-test="signup-submitbtn"]').click();

            // wait for the intercepted request
            cy.wait('@registerUser').then((interception) => {
                // Verify the request body contains correct data
                expect(interception.request.body).to.include({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                })
            })
        })

        // Verify success message is shown
        cy.contains(/User registered successfully/i).should("be.visible");

        // Verify redirect to verify page
        cy.location("pathname").should("eq", "/verify");

    })

})