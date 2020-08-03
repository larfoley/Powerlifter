describe('Sign up', () => {
  it('signs up a user', () => {
    cy.visit('/sign-up');

    cy.url().should('include', 'sign-up')

    cy.get('[data-test-username]').type('johndoe');
    cy.get('[data-test-password]').type('letmein123');
    cy.get('[data-test-email]').type('test@test.com');
    cy.get('[data-test-submit-button]').click();

    cy.url().should('include', 'sign-in')
  })
})
