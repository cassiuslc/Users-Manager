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


Cypress.Commands.add("editUser", (username) => {
    cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"58235662477","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":2}}
            });
        });

        cy.visit("http://localhost:8080/")
          .get("#primary-table");
      
        cy.get("#search-btn").should("have.attr", "disabled");
            
        cy.get("#data-table", { timeout: 15000 }).should("be.visible");

        cy.get('#data-table')
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Natasha Feeney Sr.');

        cy.get("#btn-editar").click();
})

Cypress.Commands.add("listUser", (username) => {
    cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"58235662477","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":2}}
            });
        });

        cy.visit("http://localhost:8080/")
          .get("#primary-table");
      
        cy.get("#search-btn").should("have.attr", "disabled");
            
        cy.get("#data-table", { timeout: 15000 }).should("be.visible");

        cy.get('#data-table')
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Natasha Feeney Sr.');
})