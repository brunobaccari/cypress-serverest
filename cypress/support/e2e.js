// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands') 

Cypress.Commands.add('loginApi', () => {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: 'fulano@qa.com',
        password: 'teste'
      }
    }).then((response) => {
      return response.body.authorization
    })
  })

Cypress.Commands.add('documentApiTest', (name, request, response) => {
    const testDoc = {
      name,
      request: {
        ...request,
        headers: {
          ...request.headers,
          Authorization: request.headers?.Authorization?.replace(Cypress.env('authToken'), '${token}')
        }
      },
      response: {
        status: response.status,
        body: response.body
      },
      curl: `curl -X ${request.method} ${request.url} \\
        ${Object.entries(request.headers || {}).map(([key, value]) => `-H "${key}: ${value.replace(Cypress.env('authToken'), '${token}')}"`).join(' \\\n      ')} \\
        ${request.body ? `-d '${JSON.stringify(request.body)}'` : ''}`
    }
  
    cy.writeFile(
      `cypress/results/${Cypress.spec.name.replace('.cy.js', '')}/${name}.json`,
      JSON.stringify(testDoc, null, 2)
    )
  }) 