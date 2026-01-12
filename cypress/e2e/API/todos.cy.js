

describe("HTTP requests", () => {
  //get todos
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0NiwiZmlyc3RfbmFtZSI6IkJyaWFuIiwibGFzdF9uYW1lIjoiVGhlIFVzZXIiLCJyb2xlIjoidXNlciIsImV4cCI6MTc2NzkwMDYwOSwiaWF0IjoxNzY3ODk3MDA5fQ.nkCA78wrxO6iDEoZ04O7dXx1GUtgNRHm4wxbOC3VcO0'

  it("Get all todos", () => {
    cy.request({
      method: 'GET',
      url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
        expect(response.body).to.have.property('data')

        // negative assertion
        expect(response.body).to.not.have.property('message')

      })

  })

  // POST todos
  it("Create a new todo", () => {

    const newTodo = {
      todo_name: "Write Cypress Tests",
      description: "Create end-to-end tests using Cypress.",
      due_date: "2024-12-31",
      user_id: 2,
      isCompleted: false
    }

    cy.request({
      method: 'POST',
      url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos',
      body: newTodo
    })
      .then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.be.an('object')
        // res.status(201).json({ message: 'Todo created successfully' });
        expect(response.body).to.have.property('message', 'Todo created successfully')
        // negative assertion
        expect(response.body).to.not.have.property('error', 'Internal Server Error')
      })


  })

  // GET todo by ID - happy path
  it("Get todo by ID", () => {
    cy.request('GET', 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos/2')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.be.an('object')
        expect(response.body).to.have.property('todoid')
        expect(response.body).to.have.property('todo_name')

        // expect(response.body).to.equal({
        //   "todoid": 2
        // })
      })
  })
})

// GET todo by ID - unhappy path (not found)
it("Get todo by ID - should return 404 when todo not found", () => {
  cy.request({
    method: 'GET',
    url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos/99999',
    failOnStatusCode: false //used to prevent cypress from failing the test on non-2xx status codes
  })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('message', 'Todo not found')
    })
})

// UPDATE todo - happy path
it("Update a todo", () => {
  const updatedTodo = {
    "todo_name": "Modular achitecture updated",
    "description": "Testing if it work updated",
    "created_at": "2025-10-06T16:58:46.103Z",
    "due_date": "2023-12-31T00:00:00.000Z",
    "user_id": 2
  }

  cy.request({
    method: 'PUT',
    url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos/1',
    body: updatedTodo
  })
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('object')
    })
})

// UPDATE todo - unhappy path (invalid ID)
it("Update todo - should return 400 with invalid ID", () => {
  cy.request({
    method: 'PUT',
    url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos/invalid',
    body: { todo_name: "Test" },
    failOnStatusCode: false
  })
    .then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message', 'Invalid todo id')
    })
})

// UPDATE todo - unhappy path (not found)
it("Update todo - should return 404 when todo not found", () => {
  cy.request({
    method: 'PUT',
    url: 'https://todo-api-h0byf6btcffrffhe.southafricanorth-01.azurewebsites.net/todos/99999',
    body: { todo_name: "Test" },
    failOnStatusCode: false
  })
    .then((response) => {
      expect(response.status).to.eq(404)
      expect(response.body).to.have.property('message', 'Todo not found')
    })
})



