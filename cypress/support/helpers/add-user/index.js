

class AddUserByApi {

    addUser(user){
        cy.request(
            'POST',
            'http://localhost:3333/users',
            user
        ).then(function (response) {
            expect(response.status).to.eql(200)
        })
    }

}

export default new AddUserByApi()