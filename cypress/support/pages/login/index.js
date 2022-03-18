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
    }

    form(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signIn).click()
    }

}

export default new LoginPage()