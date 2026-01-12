
describe("Authentication API", () => {
    // Test for user login
    it("User login - should return a token for valid credentials", () => {
        const credentials = {
            "email": "bkemboi590@gmail.com",
            "password": "123456"
        }

        cy.request({
            method: 'POST',
            url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: credentials
        })
            .then((respons) => {
                expect(respons.status).to.eq(200)
                expect(respons.body).to.be.an('object')
                expect(respons.body).to.have.property('message', 'Login successful')
                expect(respons.body).to.have.property('token')
                expect(respons.body).to.have.property('user')

            })
    })

    // negative test for user login
    it("User login - should fail for invalid credentials", () => {
        const invalidCredentials = {
            "email": "bkemboi590@gmail.com",
            "password": "123451"
        }
        cy.request({
            method: 'POST',
            url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: invalidCredentials,
            failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
        })
            .then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.be.an('object')
                expect(response.body).to.have.property('error', 'Invalid credentials')
            })
    })

})