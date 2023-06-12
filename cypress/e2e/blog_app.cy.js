/// <reference types="Cypress" />

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'kuromika',
      password: 'password',
      name: 'mikaela'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })
  it('Login form is shown', () => {
    cy.get('button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input#username').type('kuromika')
      cy.get('input#password').type('password')
      cy.get('button').click()
      cy.get('p.success')
      cy.contains('mikaela logged in')
    })
    it('fails with incorrect credentials', function () {
      cy.get('input#username').type('salieri')
      cy.get('input#password').type('badpassword')
      cy.get('button').click()
      cy.should('not.contain', 'salieri logged in')
      cy.get('p').should('not.have.class', 'success').and('have.class', 'error')
    })
  })
})