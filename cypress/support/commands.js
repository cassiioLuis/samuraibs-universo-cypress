import helperApi from './helpers/api'

Cypress.Commands.add('postUser', function (user) {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    helperApi.addUser(user)
})

Cypress.Commands.add('recoveryPass', function (email) {
    cy.request('POST', 'http://localhost:3333/password/forgot', { email: email })
        .then(function (response) {
            expect(response.status).to.eq(204)

            cy.task('findToken', email)
                .then(function (result) {
                    Cypress.env('recoveryToken', result.token)
                })
        })
})
