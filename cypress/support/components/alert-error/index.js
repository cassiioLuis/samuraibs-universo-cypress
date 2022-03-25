import { el } from './elements'

class AlertError {

    HaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }

}

export default new AlertError()