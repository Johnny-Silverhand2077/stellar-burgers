///<reference types="cypress"/>

const bun = '[data-cy=bun_ingredients]'
const bunTopConstructor = '[data-cy=bun_top_constructor]'
const bunBottomConstructor = '[data-cy=bun_bottom_constructor]'
const chooseBuns = '[data-cy=choose_buns]'
const main = '[data-cy=main_ingredients]'
const souce = '[data-cy=souce_ingredients]'
const ingredientConstructor = '[data-cy=ingredient_constructor]'
const constructor = '[data-cy=constructor]'
const modal = '[data-cy=modal]'
const closeIcon = '[data-cy=close_icon]'
const overlay = '[data-cy=overlay]'
const orderButton = '[data-cy=order_button]'
const orderNumber = '[data-cy=order_number]'

describe('Тесты конструктора страници', function() {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
        cy.visit('http://localhost:4000/')
        cy.viewport(1280, 720)
    })
    it('Тесты добавление булки в конструктор', function() {
        cy.get(chooseBuns).should('not.contain', 'Флюоресцентная булка R2-D3');
        cy.get(bun).contains('Добавить').click()
        cy.get(bunTopConstructor).contains('Флюоресцентная булка R2-D3').should('exist')
        cy.get(bunBottomConstructor).contains('Флюоресцентная булка R2-D3').should('exist')
    })
    it('Тесты добавление ингридиентов в конструктор', function() {
        cy.get(ingredientConstructor).should('not.contain', 'Мясо бессмертных моллюсков Protostomia');
        cy.get(ingredientConstructor).should('not.contain', 'Соус Spicy-X');

        cy.get(main).contains('Добавить').click()
        cy.get(ingredientConstructor).contains('Мясо бессмертных моллюсков Protostomia').should('exist')
        cy.get(souce).contains('Добавить').click()
        cy.get(ingredientConstructor).contains('Соус Spicy-X').should('exist')
    })
})

describe('Тест модального окна', function() {
  this.beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
    cy.viewport(1280, 720);
    
  });
  it('Тесты открытия модального окна при нажатии на ингредиенты', function() {
    cy.get(bun).contains('Флюоресцентная булка R2-D3').click();
    cy.get(modal).contains('Флюоресцентная булка R2-D3').should('exist');
  });
  it('Тесты закрытие модального окна при нажатии на крестик', function() {
    cy.get(bun).contains('Флюоресцентная булка R2-D3').click();
    cy.get(closeIcon).click();
    cy.get(modal).should('not.exist');
  });
  it('Тесты закрытие модального окна при нажатии на оверлей', function() {
    cy.get(bun).contains('Флюоресцентная булка R2-D3').click();
    cy.get(modal).should('exist');
    cy.get(overlay )
      .should('exist')
      .click('topRight', { force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Тест заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
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
    cy.get(chooseBuns).should('not.contain', 'Флюоресцентная булка R2-D3');
    cy.get(ingredientConstructor).should('not.contain', 'Мясо бессмертных моллюсков Protostomia');
    cy.get(ingredientConstructor).should('not.contain', 'Соус Spicy-X');

    cy.get(bun).contains('Добавить').click();
    cy.get(main).contains('Добавить').click();
    cy.get(souce).contains('Добавить').click();
    cy.get(orderButton)
      .contains('Оформить заказ')
      .should('exist')
      .click();
    cy.get(orderNumber).contains('1').should('exist');
    cy.get(constructor).should('not.contain', 'Флюоресцентная булка R2-D3');
    cy.get(constructor).should('not.contain', 'Флюоресцентная булка R2-D3');
    cy.get(ingredientConstructor).should(
      'not.contain',
      'Соус Spicy-X'
    );
    cy.get(ingredientConstructor).should(
      'not.contain',
      'Соус Spicy-X'
    );
    cy.get(closeIcon).click();
    cy.get(modal).should('not.exist');
  });
});
