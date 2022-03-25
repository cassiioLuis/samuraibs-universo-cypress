import loginPage from '../support/pages/login'
import helperApi from '../support/helpers/api'
import dashPage from '../support/pages/dash'

describe('login', function () {

    context('quando a senha está incorreta', function () {
        let login = {
            name: 'Fernanda Ramos',
            email: 'fernanda@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(login).then(function () {
                login.password = 'senhaErrada'
            })
        })

        it('deve exibir a mensagem de credenciais incorretas', function () {
            loginPage.go()
            loginPage.form(login)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando email está com formato inválido', function () {
        const emails = ['incorreto.com.br', 'teste@invalido', '"comaspas@"maisaspas.com.br', '@', 'email@', '@gmail.com', '123', 'abc123', '@#$¨&¨87']

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (e) {

            const login = { email: e, password: 'pwd123' }

            it('deve exibir aviso de email inválido', function () {
                loginPage.form(login)
                loginPage.submit()
                loginPage.alertError.HaveText('Informe um email válido')
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

            it('deve exibir ' + alert.toLocaleLowerCase(), function () {
                loginPage.alertError.HaveText(alert)
            })

        })
    })

    context('realizar login com sucesso', function () {

        const user = {
            name: 'Mariana Mendes',
            email: 'mariana@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve realizar o login', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })

    })

})