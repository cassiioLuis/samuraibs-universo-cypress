import { el } from './elements'

class AlertError {

    alertHaveText(expectedText) {
        cy.contains('.alert-error', expectedText)
            .should('be.visible')
    }

}

export default new AlertError()