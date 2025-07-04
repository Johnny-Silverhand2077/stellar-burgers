///<reference types="cypress"/>

describe('Тесты конструктора страници', function() {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
        cy.visit('http://localhost:4000/')
        cy.viewport(1280, 720)
    })
    it('Тесты добавление булки в конструктор', function() {
        cy.get('[data-cy=bun_ingredients]').contains('Добавить').click()
        cy.get('[data-cy=bun_1_constructor]').contains('Ингредиент_1').should('exist')
        cy.get('[data-cy=bun_2_constructor]').contains('Ингредиент_1').should('exist')
    })
    it('Тесты добавление ингридиентов в конструктор', function() {
        cy.get('[data-cy=main_ingredients]').contains('Добавить').click()
        cy.get('[data-cy=ingredient_constructor]').contains('Ингредиент_2').should('exist')
        cy.get('[data-cy=souce_ingredients]').contains('Добавить').click()
        cy.get('[data-cy=ingredient_constructor]').contains('Ингредиент_4').should('exist')
    })
})
