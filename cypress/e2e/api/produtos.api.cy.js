describe('Produtos API', { testIsolation: true }, () => {
  let authToken

  beforeEach(() => cy.loginApi().then(token => authToken = token))

  it('deve obter lista de produtos com token válido', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos',
      headers: { Authorization: authToken }
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body.produtos).to.be.an('array')
      cy.documentApiTest('listar-produtos', { method: 'GET', url: 'https://serverest.dev/produtos', headers: { Authorization: authToken } }, response)
    })
  })

  it('deve criar e excluir um produto', () => {
    cy.fixture('produto').then(productData => {
      productData.nome = `Produto ${Math.random().toString(36).substring(7)}`

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { Authorization: authToken },
        body: productData
      }).then(createResponse => {
        expect(createResponse.status).to.eq(201)
        const productId = createResponse.body._id
        cy.documentApiTest('criar-produto', { method: 'POST', url: 'https://serverest.dev/produtos', headers: { Authorization: authToken }, body: productData }, createResponse)

        cy.request({
          method: 'DELETE',
          url: `https://serverest.dev/produtos/${productId}`,
          headers: { Authorization: authToken }
        }).then(deleteResponse => {
          expect(deleteResponse.status).to.eq(200)
          expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso')
          cy.documentApiTest('excluir-produto', { method: 'DELETE', url: `https://serverest.dev/produtos/${productId}`, headers: { Authorization: authToken } }, deleteResponse)
        })
      })
    })
  })
}) 