/// <reference types="cypress" />

describe('blocklet app check url query', () => {
  const hash = '0000000000000000000e82aa3bd78ba445499617d973554834eef9d5f9eb9d6d';
  beforeEach(() => {
    cy.visit('http://localhost:8090');
  });

  it('empty check', () => {
    cy.get('.ant-input-group-addon .ant-btn').click();
    cy.get('.ant-message-notice .ant-message-custom-content').should('contain', 'please input hash');
  });

  it('input data check', () => {
    cy.intercept(`https://blockchain.info/rawblock/${hash}`).as('blockData');
    cy.get('.ant-input').type(hash);
    cy.get('.ant-input-group-addon .ant-btn').click();
    cy.wait('@blockData').then((intercepttion) => {
      expect(intercepttion.response.statusCode).to.eq(200);
      expect(intercepttion.response.body).to.have.property('hash');
      expect(intercepttion.response.body.hash).to.eq(hash);

      cy.wait(2000);
      const data = intercepttion.response.body;
      cy.get('.ant-descriptions-view table')
        .find('.ant-descriptions-row')
        .eq(3)
        .find('.ant-descriptions-item')
        .eq(1)
        .should('contain', `${data.block_index}`.replace(/\B(?=(\d{3})+$)/g, ','));
    });
  });
});
