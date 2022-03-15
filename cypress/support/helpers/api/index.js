

class HelpersApi {

    addUser(user){
        cy.request(
            'POST',
            'http://localhost:3333/users',
            user
        ).then(function (response) {
            expect(response.status).to.eql(200)
        })
    }

    intercept(type, path, statusCode) {
        cy.intercept(type, path,{
            statusCode: statusCode
        }).as('intercepeted')

        cy.wait('@intercepeted')
    }

}

export default new HelpersApi()