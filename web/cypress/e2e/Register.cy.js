describe("Register", () => {

    it("Registro normal", () => {
        cy.visit("http://localhost:8080/register")
            .get("#form-register-container")

        cy.intercept("POST", "http://localhost/api/users/create", (req) => {
            const requestBody = req.body;

            // Verifique se o corpo da requisição está correto
            expect(requestBody).to.deep.equal({
                "name": "João da Silva",
                "cpf": "258.137.500-02",
                "email": "a@a.com",
                "password": "asf@#2024",
                "confirmPassword": "asf@#2024"
            });

            req.reply({
                statusCode: 201,
                body: {
                    "message": "Usuário criado com sucesso!",
                    "user": {
                        "name": "João da Silva",
                        "email": "a@a.com",
                        "cpf": "25813750002",
                        "updated_at": "2024-04-16T04:32:39.000000Z",
                        "created_at": "2024-04-16T04:32:39.000000Z",
                        "id": 856
                    }
                }
                });
            });


        cy.get("#name").type("João da Silva");

        cy.get("#email").type("a@a.com");

        cy.get("#cpf").type("258.137.500-02");

        cy.get("#password").type("asf@#2024");

        cy.get("#confirmpassword").type("asf@#2024");

        cy.get("#btn-submit").click();

        cy.contains('.Vue-Toastification__toast-body', 'Usuário criado com sucesso!')
        .should('be.visible');
    })

    it("Register CPF errado", () => {
        cy.visit("http://localhost:8080/register")
            .get("#form-register-container")

        cy.get("#name").type("João da Silva");

        cy.get("#email").type("a@a.com");

        cy.get("#cpf").type("111.111.111-11");

        cy.get("#password").type("asf@#2024");

        cy.get("#confirmpassword").type("asf@#2024");

        cy.intercept("POST", "http://localhost/api/users/create").as("formSubmission");

        cy.get("#btn-submit").click();

        cy.get("#cpf-messages")
        .contains(".v-messages__message", "CPF invalido.")
        .should("be.visible");
    })

    it("Register E-mail errado", () => {
        cy.visit("http://localhost:8080/register")
            .get("#form-register-container")

        cy.get("#name").type("João da Silva");

        cy.get("#email").type("aa.com");

        cy.get("#cpf").type("258.137.500-02");

        cy.get("#password").type("asf@#2024");

        cy.get("#confirmpassword").type("asf@#2024");

        cy.intercept("POST", "http://localhost/api/users/create").as("formSubmission");

        cy.get("#btn-submit").click();

        cy.get("#email-messages")
        .contains(".v-messages__message", "E-mail invalido.")
        .should("be.visible");

    })

    it("Register sem input", () => {
        cy.visit("http://localhost:8080/register")
            .get("#form-register-container")

        cy.intercept("POST", "http://localhost/api/users/create").as("formSubmission");

        cy.get("#btn-submit").click();

        cy.get("#email-messages")
        .contains(".v-messages__message", "Este campo é obrigatório.")
        .should("be.visible");
        cy.get("#cpf-messages")
        .contains(".v-messages__message", "Este campo é obrigatório.")
        .should("be.visible");
        cy.get("#email-messages")
        .contains(".v-messages__message", "Este campo é obrigatório.")
        .should("be.visible");
        cy.get("#password-messages")
        .contains(".v-messages__message", "Este campo é obrigatório.")
        .should("be.visible");
        cy.get("#confirmpassword-messages")
        .contains(".v-messages__message", "Este campo é obrigatório.")
        .should("be.visible");

    })

})