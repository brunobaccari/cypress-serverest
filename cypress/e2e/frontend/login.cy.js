describe('Login', { testIsolation: true }, () => {
  beforeEach(() => {
  
  })

  it('deve fazer login com sucesso', () => {
    cy.then(() => {
      const { email, password } = Cypress.env('account')
      const loginData = { email, password }
      cy.visit('/login')
      cy.screenshot('login-page')
      
      cy.get('input[name="email"]').type(loginData.email)
      cy.get('input[name="password"]').type(loginData.password, { log: false })
      cy.screenshot('login-filled')
      
      cy.get('button[type="submit"]').click()

      cy.url().should('include', '/admin/home')
      cy.get('img.imagem').should('be.visible')
      cy.contains('h1', 'Bem Vindo').should('be.visible')
      cy.screenshot('login-success')
    })
  })

  it('deve fazer logout com sucesso', () => {
    cy.then(() => {
      const { email, password } = Cypress.env('account')
      const loginData = { email, password }
      cy.visit('/login')
      cy.get('input[name="email"]').type(loginData.email)
      cy.get('input[name="password"]').type(loginData.password, { log: false })
      cy.get('button[type="submit"]').click()

      cy.url().should('include', '/admin/home')
      cy.screenshot('before-logout')
      
      cy.get('button[data-testid="logout"]').click()
      
      cy.url().should('eq', 'https://front.serverest.dev/login')
      cy.screenshot('after-logout')
    })
  })
})