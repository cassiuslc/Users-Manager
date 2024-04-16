describe("Editar", () => {
    
    it("Editar Nome", () => {

        cy.editUser("Natasha Feeney Sr.");

        cy.get("#name")
        .should('have.value', 'Natasha Feeney Sr.')
        .clear()
        .type("Mudando Nome");

        cy.intercept("PUT", "http://localhost/api/users/757", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    "message": "Usu\u00e1rio atualizado com sucesso!",
                    "user": {
                        "id": 757,
                        "name": "Mudando Nome",
                        "cpf": "58235662477",
                        "email": "tremblay.tyree@example.com",
                        "email_verified_at":"2024-04-16T02:37:31.000000Z",
                        "created_at":"2024-04-16T02:37:32.000000Z",
                        "updated_at":"2024-04-16T02:37:32.000000Z"
                    }
                }
            });
        });

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Mudando Nome","cpf":"58235662477","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":50}}
            });
        });

        cy.get("#btn-salvar").click();

        cy.contains('.Vue-Toastification__toast-body', 'Usuário atualizado com sucesso!')
        .should('be.visible');

        cy.get('#data-table', { timeout: 15000 })
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Mudando Nome');
      
    });

    it("Editar CPF", () => {

        cy.editUser("Natasha Feeney Sr.");

        cy.get("#cpf")
        .should('have.value', '582.356.624-77')
        .clear()
        .type("188.224.090-19");

        cy.intercept("PUT", "http://localhost/api/users/757", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    "message": "Usu\u00e1rio atualizado com sucesso!",
                    "user": {
                        "id": 757,
                        "name": "Natasha Feeney Sr.",
                        "cpf": "18822409019",
                        "email": "tremblay.tyree@example.com",
                        "email_verified_at":"2024-04-16T02:37:31.000000Z",
                        "created_at":"2024-04-16T02:37:32.000000Z",
                        "updated_at":"2024-04-16T02:37:32.000000Z"
                    }
                }
            });
        });

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"18822409019","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":50}}
            });
        });

        cy.get("#btn-salvar").click();

        cy.contains('.Vue-Toastification__toast-body', 'Usuário atualizado com sucesso!')
        .should('be.visible');

        cy.get('#data-table', { timeout: 15000 })
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('188.224.090-19');
      
    });

    it("Editar E-mail", () => {

        cy.editUser("Natasha Feeney Sr.");

        cy.get("#email")
        .should('have.value', 'tremblay.tyree@example.com')
        .clear()
        .type("novoemail@example.com");

        cy.intercept("PUT", "http://localhost/api/users/757", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    "message": "Usu\u00e1rio atualizado com sucesso!",
                    "user": {
                        "id": 757,
                        "name": "Natasha Feeney Sr.",
                        "cpf": "58235662477",
                        "email": "novoemail@example.com",
                        "email_verified_at":"2024-04-16T02:37:31.000000Z",
                        "created_at":"2024-04-16T02:37:32.000000Z",
                        "updated_at":"2024-04-16T02:37:32.000000Z"
                    }
                }
            });
        });

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"58235662477","email":"novoemail@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":50}}
            });
        });

        cy.get("#btn-salvar").click();

        cy.contains('.Vue-Toastification__toast-body', 'Usuário atualizado com sucesso!')
        .should('be.visible');

        cy.get('#emailDestaque')
        .should('have.attr', 'href', 'mailto:novoemail@example.com')
        .should('contain', 'novoemail@example.com');

    });

    it("Editar Senha", () => {

        cy.editUser("Natasha Feeney Sr.");

        cy.get('i[aria-label="Senha appended action"]').click();
        cy.get("#password")
        .type("Senha@#2024");
        
        cy.get('i[aria-label="Confirma Senha appended action"]').click();
        cy.get("#confirmPassword")
        .type("Senha@#2024");

        cy.intercept("PUT", "http://localhost/api/users/757", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    "message": "Usu\u00e1rio atualizado com sucesso!",
                    "user": {
                        "id": 757,
                        "name": "Natasha Feeney Sr.",
                        "cpf": "58235662477",
                        "email": "tremblay.tyree@example.com",
                        "email_verified_at":"2024-04-16T02:37:31.000000Z",
                        "created_at":"2024-04-16T02:37:32.000000Z",
                        "updated_at":"2024-04-16T02:37:32.000000Z"
                    }
                }
            });
        });

        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"58235662477","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":50}}
            });
        });

        cy.get("#btn-salvar").click();

        cy.contains('.Vue-Toastification__toast-body', 'Usuário atualizado com sucesso!')
        .should('be.visible');

    });


})