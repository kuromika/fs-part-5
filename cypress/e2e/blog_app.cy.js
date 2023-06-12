/// <reference types="Cypress" />

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })
  it('Login form is shown', () => {
    cy.get('button').contains('login')
  })
})