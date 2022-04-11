import { el } from './elements'

import toast from '../../components/toast'
import alertError from '../../components/alert-error'

class LoginPage {

    constructor () {
        this.toast = toast
        this.alertError = alertError
    }
    
    go() {
        cy.visit('/')

        cy.contains(el.title)
            .should('be.visible')
    }

    form(user) {
        cy.get(el.email).clear().type(user.email)
        cy.get(el.password).clear().type(user.password)
    }

    submit() {
        cy.contains(el.signIn).click()
    }

}

export default new LoginPage()