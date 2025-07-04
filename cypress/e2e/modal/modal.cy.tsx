///<reference types="cypress"/>

describe('Тест модального окна', function() {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1280, 720);
    
  });
  it('Тесты открытия модального окна при нажатии на ингредиенты', function() {
    cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
    cy.get('[data-cy=modal]').contains('Ингредиент_1').should('exist');
  });
  it('Тесты закрытие модального окна при нажатии на крестик', function() {
    cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('Тесты закрытие модального окна при нажатии на оверлей', function() {
    cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=overlay]')
      .should('exist')
      .click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
