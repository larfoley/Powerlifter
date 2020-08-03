Cypress.Commands.add("login", (email, password) => {
  cy.request({
      url: 'http://localhost:3000/token',
      method: 'POST',
      body: {
        username: 'testuser',
        password: 'letmein123',
        grant_type: 'password'
      }
    })
})
