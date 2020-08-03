let user;

before(() => {
  cy.request({
      url: 'http://localhost:3000/token',
      method: 'POST',
      body: {
        username: 'testuser',
        password: 'letmein123',
        grant_type: 'password'
      }
    })
    .its('body')
    .then(({ access_token, token_type }) => {
      user = {
        authenticated: {
          authenticator: "authenticator:oauth2-password-grant",
          access_token,
          token_type
        }
      }
    })
})

describe('Create a goal', () => {
  it('clicks the link "type"', () => {
    cy.visit('/goals/new', {
      onBeforeLoad (win) {
        win.localStorage.setItem('ember_simple_auth-session', JSON.stringify(user));
      },
    });

    cy.url().should('include', 'goals')
  })
})
