import { el } from './elements'

class H1 {
    
    shouldHaveText(expectText) {
        cy.get(el.h1)
            .should('have.text', expectText)
    }

}

export default new H1()