import { el } from './elements'

import h1 from '../../components/h1'
import toast from '../../components/toast'
import alertError from '../../components/alert-error'

class LoginPage {

    constructor () {
        this.h1 = h1
        this.toast = toast
        this.alertError = alertError
    }
    
    go() {
        cy.visit('http://localhost:3000/')
    }

    form(login) {
        cy.get(el.email).type(login.email)
        cy.get(el.password).type(login.password)
    }

    submit() {
        cy.contains(el.button).click()
    }

}

export default new LoginPage()