import './commands'

let accountId
const created = { usuarios: new Set(), produtos: new Set() }

before(() => {
  const id = crypto.randomUUID()
  const account = { nome: 'QA ' + id, email: `qa-${id}@example.com`, password: crypto.randomUUID(), administrador: 'true' }
  Cypress.env('account', account)
  cy.request({ method: 'POST', url: `${Cypress.env('apiUrl')}/usuarios`, body: account, log: false }).then(response => {
    accountId = response.body._id
    expect(response.status).to.eq(201)
    expect(accountId).to.be.a('string').and.not.be.empty
  })
})

beforeEach(() => {
  for (const resource of ['usuarios', 'produtos']) {
    cy.intercept('POST', `**/${resource}`, request => {
      request.on('response', response => {
        if (response.statusCode === 201 && response.body._id) created[resource].add(response.body._id)
      })
    }).as(resource + 'Cadastro')
  }
})

after(() => {
  if (!accountId) return
  cy.loginApi().then(token => {
    for (const resource of ['produtos', 'usuarios']) {
      for (const id of created[resource]) {
        cy.request({ method: 'DELETE', url: `${Cypress.env('apiUrl')}/${resource}/${id}`, headers: { Authorization: token }, log: false }).its('status').should('eq', 200)
      }
    }
    cy.request('DELETE', `${Cypress.env('apiUrl')}/usuarios/${accountId}`).its('status').should('eq', 200)
  })
})

Cypress.Commands.add('loginApi', () => {
  const { email, password } = Cypress.env('account')
  return cy.request({ method: 'POST', url: `${Cypress.env('apiUrl')}/login`, body: { email, password }, log: false }).then(response => {
    expect(response.status).to.eq(200)
    expect(response.body.authorization).to.match(/^Bearer /)
    return response.body.authorization
  })
})

Cypress.Commands.add('documentApiTest', (name, request, response) => {
  const resource = new URL(request.url).pathname.split('/')[1]
  if (request.method === 'POST' && response.status === 201 && created[resource]) created[resource].add(response.body._id)
  cy.writeFile(`cypress/results/${Cypress.spec.name}/${name}.json`, {
    name, method: request.method, path: new URL(request.url).pathname,
    status: response.status,
  }, { log: false })
})
