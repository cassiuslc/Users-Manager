describe("Pesquisar", () => {
    
    it("Pesquisar pelo nome", () => {

        cy.listUser("Mohammad Sawayn");

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=Mohammad%20Sawayn", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":1}}
            });
        });

        cy.get("#search").type("Mohammad Sawayn");

        cy.get("#search-btn").click();

        cy.get('#data-table', { timeout: 15000 })
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Mohammad Sawayn');
        
    });

    it("Pesquisar pelo e-mail", () => {

        cy.listUser("Mohammad Sawayn");

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=sofia50@example.net", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":1}}
            });
        });

        cy.get("#search").type("sofia50@example.net");

        cy.get("#search-btn").click();

        cy.get('#emailDestaque')
        .should('have.attr', 'href', 'mailto:sofia50@example.net')
        .should('contain', 'sofia50@example.net');
    });

    it("Pesquisar pelo CPF", () => {

        cy.listUser("Mohammad Sawayn");

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=851.459.136-30", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":1}}
            });
        });

        cy.get("#search").type("851.459.136-30");

        cy.get("#search-btn").click();

        cy.get('#data-table', { timeout: 15000 })
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('851.459.136-30');
    });

    it("Pesquisar pelo ID", () => {

        cy.listUser("Mohammad Sawayn");

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=758", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":1}}
            });
        });

        cy.get("#search").type("758");

        cy.get("#search-btn").click();

        cy.get('#data-table', { timeout: 15000 })
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Mohammad Sawayn');
    });
});