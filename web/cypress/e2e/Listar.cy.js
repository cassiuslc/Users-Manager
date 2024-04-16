describe("Listar", () => {

    it("Listar Vazia", () => {
        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    "users": {
                        "current_page": 1,
                        "data": [],
                        "first_page_url": "http://localhost/api/users?page=1",
                        "from": null,
                        "last_page": 1,
                        "last_page_url": "http://localhost/api/users?page=1",
                        "links": [
                            {
                                "url": null,
                                "label": "&laquo; Anterior",
                                "active": false
                            },
                            {
                                "url": "http://localhost/api/users?page=1",
                                "label": "1",
                                "active": true
                            },
                            {
                                "url": null,
                                "label": "Próximo &raquo;",
                                "active": false
                            }
                        ],
                        "next_page_url": null,
                        "path": "http://localhost/api/users",
                        "per_page": 10,
                        "prev_page_url": null,
                        "to": null,
                        "total": 0
                    }
                }
            });
        });

        cy.visit("http://localhost:8080/")
          .get("#primary-table");
      
        cy.get("#search-btn").should("have.attr", "disabled");
            
        cy.get("#data-table", { timeout: 15000 }).should("be.visible");

        cy.get("#alert-empty");
    });

    it("Listar com dados", () => {
        cy.intercept("GET", "http://localhost/api/users?page=1&perPage=10&sortBy=&sortOrder=&search=", (req) => {
            req.reply({
                statusCode: 200,
                body: {"users":{"current_page":1,"data":[{"id":757,"name":"Natasha Feeney Sr.","cpf":"58235662477","email":"tremblay.tyree@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":758,"name":"Mohammad Sawayn","cpf":"85145913630","email":"sofia50@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":759,"name":"Dennis Becker","cpf":"11553046161","email":"vmiller@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":760,"name":"Mercedes Nienow","cpf":"74411251469","email":"ernesto08@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":761,"name":"Sim Huels","cpf":"33288236893","email":"runte.garfield@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":762,"name":"Prof. Gunner Sipes","cpf":"06552125585","email":"aimee23@example.com","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":763,"name":"Cecil Kris","cpf":"41180390440","email":"davion58@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":764,"name":"Paolo Pfeffer","cpf":"06994459659","email":"yferry@example.org","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":765,"name":"Chaz Padberg","cpf":"54950138910","email":"xconroy@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"},{"id":766,"name":"Loren Lueilwitz","cpf":"66427109162","email":"dibbert.rosalinda@example.net","email_verified_at":"2024-04-16T02:37:31.000000Z","created_at":"2024-04-16T02:37:32.000000Z","updated_at":"2024-04-16T02:37:32.000000Z"}],"first_page_url":"http:\/\/localhost\/api\/users?page=1","from":1,"last_page":5,"last_page_url":"http:\/\/localhost\/api\/users?page=5","links":[{"url":null,"label":"&laquo; Anterior","active":false},{"url":"http:\/\/localhost\/api\/users?page=1","label":"1","active":true},{"url":"http:\/\/localhost\/api\/users?page=2","label":"2","active":false},{"url":"http:\/\/localhost\/api\/users?page=3","label":"3","active":false},{"url":"http:\/\/localhost\/api\/users?page=4","label":"4","active":false},{"url":"http:\/\/localhost\/api\/users?page=5","label":"5","active":false},{"url":"http:\/\/localhost\/api\/users?page=2","label":"Pr\u00f3ximo &raquo;","active":false}],"next_page_url":"http:\/\/localhost\/api\/users?page=2","path":"http:\/\/localhost\/api\/users","per_page":10,"prev_page_url":null,"to":10,"total":50}}
            });
        });

        cy.visit("http://localhost:8080/")
          .get("#primary-table");
      
        cy.get("#search-btn").should("have.attr", "disabled");
            
        cy.get("#data-table", { timeout: 15000 }).should("be.visible");

        cy.get('#data-table')
        .find('.v-data-table__td.v-data-table-column--align-start')
        .contains('Natasha Feeney Sr.');

        cy.get('.v-data-table-footer__info')
        .contains('1-10 of 50');
    });
})