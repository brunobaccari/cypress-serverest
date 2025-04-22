describe('Produtos', { testIsolation: true }, () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/admin/cadastrarprodutos')
  })

  it('deve cadastrar um novo produto com sucesso', () => {
    cy.fixture('produto').then(productData => {
      productData.nome = `Produto ${Math.random().toString(36).substring(7)}`

      cy.screenshot('cadastro-inicio')
      cy.preencherProduto(productData)
      cy.screenshot('cadastro-preenchido')
      cy.get('button[type="submit"]').click()

      cy.visit('/admin/listarprodutos')
      cy.screenshot('lista-produtos')
      cy.contains('td', productData.nome).should('be.visible')
      cy.screenshot('produto-criado')
    })
  })

  it('deve excluir um produto existente', () => {
    cy.fixture('produto').then(productData => {
      productData.nome = `Produto ${Math.random().toString(36).substring(7)}`

      cy.screenshot('exclusao-inicio')
      cy.preencherProduto(productData)
      cy.get('button[type="submit"]').click()

      cy.visit('/admin/listarprodutos')
      cy.screenshot('lista-antes-exclusao')

      cy.contains('td', productData.nome)
        .parent('tr')
        .find('button.btn-danger')
        .click()

      cy.wait(5000)
      cy.screenshot('apos-clicar-excluir')
      cy.contains('td', productData.nome).should('not.exist')
      cy.screenshot('produto-excluido')
    })
  })
})
