describe('Usuários API', { testIsolation: true }, () => {
  let authToken

  beforeEach(() => cy.loginApi().then(token => authToken = token))

  it('deve obter lista de usuários com token válido', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',
      headers: { Authorization: authToken }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.usuarios).to.be.an('array')
      cy.documentApiTest('listar-usuarios', { method: 'GET', url: 'https://serverest.dev/usuarios', headers: { Authorization: authToken } }, response)
    })
  })

  it('deve criar e excluir um usuário', () => {
    cy.fixture('usuario').then(userData => {
      userData.email = `teste${Date.now()}@teste.com`

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        headers: { Authorization: authToken },
        body: userData
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201)
        const userId = createResponse.body._id
        cy.documentApiTest('criar-usuario', { method: 'POST', url: 'https://serverest.dev/usuarios', headers: { Authorization: authToken }, body: userData }, createResponse)

        cy.request({
          method: 'DELETE',
          url: `https://serverest.dev/usuarios/${userId}`,
          headers: { Authorization: authToken }
        }).then(deleteResponse => {
          expect(deleteResponse.status).to.eq(200)
          expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
          cy.documentApiTest('excluir-usuario', { method: 'DELETE', url: `https://serverest.dev/usuarios/${userId}`, headers: { Authorization: authToken } }, deleteResponse)
        })
      })
    })
  })
}) 