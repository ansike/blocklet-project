/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('blocklet app check url query', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:8090/?hash=0000000000000000000ef9c073beedafb33a4f1874b80ac16500516e782f5b85');
  });

  it('read url query and set it to input value', () => {
    cy.get('.ant-input').should('have.value', '0000000000000000000ef9c073beedafb33a4f1874b80ac16500516e782f5b85');
  });
});
