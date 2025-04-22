describe('Usuários', { testIsolation: true }, () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/admin/cadastrarusuarios')
  })

  it('deve cadastrar um novo usuário com sucesso', () => {
    cy.fixture('usuario').then(userData => {
      userData.email = `user${Math.random().toString(36).substring(7)}@test.com`

      cy.screenshot('cadastro-inicio')

      cy.preencherUsuario(userData)

      cy.screenshot('cadastro-preenchido')

      cy.get('button[type="submit"]').click()

      cy.visit('/admin/listarusuarios')
      cy.screenshot('lista-usuarios')

      cy.contains('td', userData.nome).should('be.visible')
      cy.screenshot('usuario-criado')
    })
  })

  it('deve excluir um usuário existente', () => {
    cy.fixture('usuario').then(userData => {
      userData.email = `delete${Math.random().toString(36).substring(7)}@test.com`

      cy.screenshot('exclusao-inicio')

      cy.preencherUsuario(userData)
      cy.get('button[type="submit"]').click()

      cy.visit('/admin/listarusuarios')
      cy.screenshot('lista-antes-exclusao')

      cy.contains('td', userData.email)
        .parent('tr')
        .find('button.btn-danger')
        .click()

      cy.wait(5000)
      cy.screenshot('apos-clicar-excluir')
      cy.contains('td', userData.email).should('not.exist')
      cy.screenshot('usuario-excluido')
    })
  })
})
