describe("Verificar_Status_DB", () => {
    it("DB_ONLINE", () => {
        cy.visit("http://localhost:8080/");

        cy.intercept("GET", "http://localhost/api/db/healthcheck", (req) => {
            req.reply({ body: { status: true } });
        }).as("healthCheck");

        cy.get("i", { timeout: 15000 }).should("have.class", "mdi-check-circle");
    });


    it("DB_OFFLINE", () => {
        cy.intercept("GET", "http://localhost/api/db/healthcheck", (req) => {
            req.reply({ body: { status: false } });
        }).as("healthCheck");

        cy.visit("http://localhost:8080/");

        cy.get("i", { timeout: 15000 }).should("have.class", "mdi-fire-circle");
    });

    it("API_NOT_RESPONSE", () => {
        cy.intercept("GET", "http://localhost/api/db/healthcheck", (req) => {
            req.reply({
                statusCode: 504,
                body: { } 
            });
        }).as("healthCheck");

        cy.visit("http://localhost:8080/");

        cy.get("i", { timeout: 15000 }).should("have.class", "mdi-fire-circle");
    });

    it("DB_RETURN", () => {
        cy.intercept("GET", "http://localhost/api/db/healthcheck", (req) => {
            req.reply({ body: { status: false } });
        }).as("healthCheck");

        cy.visit("http://localhost:8080/");

        cy.get("i", { timeout: 15000 }).should("have.class", "mdi-fire-circle");

        cy.intercept("GET", "http://localhost/api/db/healthcheck", (req) => {
            req.reply({ body: { status: true } });
        }).as("healthCheck");

        cy.get("#alert-error-btn", { timeout: 15000 }).click();

        cy.get("i", { timeout: 15000 }).should("have.class", "mdi-check-circle");
    });

});
