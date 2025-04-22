

Cypress.Commands.add('login', () => {
  cy.visit('/login')
  cy.get('input[name="email"]').type('fulano@qa.com')
  cy.get('input[name="password"]').type('teste')
  cy.get('button[type="submit"]').click()
  cy.url().should('include', '/admin/home')
})



Cypress.Commands.add('preencherProduto', (productData) => {
  cy.get('[data-testid="nome"]').type(productData.nome)
  cy.get('[data-testid="preco"]').type(productData.preco)
  cy.get('[data-testid="descricao"]').type(productData.descricao)
  cy.get('[data-testid="quantity"]').type(productData.quantidade)
})

Cypress.Commands.add('preencherUsuario', (userData) => {
  cy.get('[data-testid="nome"]').type(userData.nome)
  cy.get('[data-testid="email"]').type(userData.email)
  cy.get('[data-testid="password"]').type(userData.password)
  if (userData.isAdmin) {
    cy.get('[data-testid="checkbox"]').check()
  }
})
