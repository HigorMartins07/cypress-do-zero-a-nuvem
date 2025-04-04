// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName')
    .should('be.visible')
    .type('Higor')
    .should('have.value', 'Higor') //Preenchimento Nome/sobrenome/email
    
    cy.get('#lastName')
    .should('be.visible')
    .type('Soares')
    .should('have.value', 'Soares') 

    cy.get('#email')
    .should('be.visible')
    .type('higor@gmail.com')
    .should('have.value', 'higor@gmail.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Teste de feedback', {delay:40})
    .should('have.value', 'Teste de feedback') 

    cy.get('.button') // Clique no botão de envio
    .click()

})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit_comobjeto', (data = {
    //valores default
    firstName:'John',
    lastName:'Doe',
    email:'johndoe@example.com',
    text: 'teste'
}) =>{
    cy.get('#firstName')
    .should('be.visible')
    .type(data.firstName)
    
    cy.get('#lastName')
    .should('be.visible')
    .type(data.lastName)

    cy.get('#email')
    .should('be.visible')
    .type(data.email)

    cy.get('#open-text-area')
    .should('be.visible')
    .type(data.text, {delay:40})

    cy.get('.button') // Clique no botão de envio
    .click()
})