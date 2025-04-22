describe('Login API', { testIsolation: true }, () => {
  it('deve fazer login com credenciais válidas', () => {
    cy.fixture('login').then(loginData => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: loginData
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.authorization).to.be.a('string')
        cy.documentApiTest('login', { method: 'POST', url: 'https://serverest.dev/login', body: loginData }, response)
      })
    })
  })
}) 