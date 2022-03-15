import loginPage from '../support/pages/login'
import addUser from '../support/helpers/add-user'

describe('login', function () {

    context('quando a senha está incorreta', function () {
        const login = {
            name: 'Fernanda Ramos',
            email: 'fernanda@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {

            cy.task('removeUser', login.email)
                .then(function (result) {
                    console.log(result)
                })

            addUser.addUser(login)
        })

        it('deve exibir a mensagem de credenciais incorretas', function () {
            login.password = 'senhaErrada'

            loginPage.go()
            loginPage.form(login)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando email está com formato inválido', function () {
        const emails = ['incorreto.com.br', 'teste@invalido', '"comaspas@"maisaspas.com.br']

        beforeEach(function () {
            loginPage.go()
        })

        emails.forEach(function (e) {

            const login = { email: e, password: 'pwd123'}

            it('deve exibir aviso de email inválido', function () {
                loginPage.form(login)
                loginPage.submit()
                loginPage.alertError.alertHaveText('Informe um email válido')
            })
        })
        
    })

    context('quando não preencho os campos', function () {
        const alertMessages = ['E-mail é obrigatório', 'Senha é obrigatória']
        
        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            
            it('deve exibir ' + alert.toLocaleLowerCase(), function (){
                loginPage.alertError.alertHaveText(alert)
            })

        })
    })

    context('realizar login com sucesso', function () {

        const login = {
            name: 'Mariana Mendes',
            email: 'mariana@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', login.email)
                .then(function (result) {
                    console.log(result)
                })

            addUser.addUser(login)
        })

        it('deve realizar o login', function () {
            loginPage.go()
            loginPage.form(login)
            loginPage.submit()
            loginPage.h1.shouldHaveText('Horários agendados')
        })

    })

})