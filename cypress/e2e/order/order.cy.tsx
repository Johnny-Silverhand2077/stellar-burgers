///<reference types="cypress"/>

describe('Тест заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'userData.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'successOrder.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );

    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000/')
    cy.viewport(1280, 720);
  });
  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('Тесты добалвение ингредиентов и создания заказа', function () {
    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=souce_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order_button]')
      .contains('Оформить заказ')
      .should('exist')
      .click();
    cy.get('[data-cy=order_number]').contains('2128506').should('exist');
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент_1');
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент_1');
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингредиент_4'
    );
    cy.get('[data-cy=ingredient_constructor]').should(
      'not.contain',
      'Ингредиент_4'
    );
  });
});
