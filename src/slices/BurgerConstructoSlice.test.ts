import { TConstructorIngredient } from '@utils-types';
import burgerCostructorSlice, {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  clearOrder
} from './BurgerConstructoSlice';

describe('Тесты BurgerConstroctorSlice', () => {
  const ingredient1: TConstructorIngredient = {
    id: '60d3b41abdacab0026a733cd',
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '60d3b41abdacab0026a733cb',
    _id: '60d3b41abdacab0026a733cb',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  const bun: TConstructorIngredient = {
    id: '60d3b41abdacab0026a733c6',
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  it('Тест добавление ингредиентов в конструктор', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('Тест удаление ингредиентов в конструкторе', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(
      initialState,
      removeIngredient(ingredient1)
    );

    expect(newState.constructorItems.ingredients).toHaveLength(1);
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  it('Тест добавление булки в конструктор', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );

    expect(newState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('Тест на перемещение ингредиента вверх', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(
      initialState,
      moveUpIngredient(1)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('Тест на перемещение ингредиента вниз', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(
      initialState,
      moveDownIngredient(0)
    );

    expect(newState.constructorItems.ingredients[1]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...ingredient2,
      id: expect.any(String)
    });
  });

  it('Тест очищение конструктора', () => {
    const initialState = {
      constructorItems: {
        bun: bun,
        ingredients: [ingredient1, ingredient2]
      },
      loading: false,
      error: null,
      orderModalData: null,
      orderRequst: false
    };

    const newState = burgerCostructorSlice.reducer(initialState, clearOrder());

    expect(newState.constructorItems).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
