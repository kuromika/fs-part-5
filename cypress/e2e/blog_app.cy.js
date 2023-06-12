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

  describe('When logged in', function () {
    beforeEach(() => {
      cy.login('kuromika', 'password')
    })
    it('A blog can be created', function () {
      cy.get('button').contains('new blog').click()
      cy.get('input#title').type('new blog')
      cy.get('input#author').type('Makise Kurisu')
      cy.get('input#url').type('SERN')
      cy.get('button').contains('create').click()
      cy.contains('new blog Makise Kurisu')
    })

    describe.only('And there is one blog created', function () {
      beforeEach(() => {
        cy.createBlog('new blog', 'makise', 'google')
      })
      it('user can like blog', function () {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('1')
      })
    })
  })
})