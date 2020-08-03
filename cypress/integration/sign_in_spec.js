describe('Sign in', () => {
  it('sign in a user', () => {
    cy.visit('/sign-in');

    cy.url().should('include', 'sign-in')

    cy.get('[data-test-username]').type('testuser');
    cy.get('[data-test-password]').type('letmein123');
    cy.get('[data-test-submit-button]').click();

    cy.url().should('include', 'home')
  })
})
