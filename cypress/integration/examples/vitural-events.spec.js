/// <reference types="cypress" />

context("Virtual Events", () => {
  beforeEach(() => {
    cy.visit("https://www.evvntly.com/virtual-events");
  });

  it("Visits The Page", () => {
    cy.url().should("include", "/virtual-events");
    cy.wait(5000);
  });
});
