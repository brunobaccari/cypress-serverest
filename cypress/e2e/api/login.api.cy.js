describe('Login API', { testIsolation: true }, () => {
  it('deve fazer login com credenciais válidas', () => {
    cy.then(() => {
      const { email, password } = Cypress.env('account')
      const loginData = { email, password }
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/login`,
        log: false,
        body: loginData
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.authorization).to.be.a('string')
        cy.documentApiTest('login', { method: 'POST', url: `${Cypress.env('apiUrl')}/login`, log: false,
        body: loginData }, response)
      })
    })
  })
}) 