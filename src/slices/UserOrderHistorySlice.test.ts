import {
  ordersHistory,
  userOrderHistorySlice,
  TOrtdersHistoryState
} from './UserOrderHistorySlice';

const initialState: TOrtdersHistoryState = {
  orders: [],
  loading: false,
  error: null
};

const ordersTest = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Тесты UserOrderHistorySlice', () => {
  it('Тест загрузки в true и сброс ошибки при статусе pending', () => {
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        error: 'Ошибка теста'
      },
      ordersHistory.pending('')
    );

    expect(actualState).toEqual({
      orders: [],
      error: null,
      loading: true
    });
  });

  it('Тест загрузки в false и обновлкник данных при успешнои выполнении', () => {
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.fulfilled(ordersTest.orders, '')
    );

    expect(actualState).toEqual({
      orders: ordersTest.orders,
      error: null,
      loading: false
    });
  });

  it('Тест сообщения об ошибки и сброс флага загрузки при неудаче', () => {
    const errorTest = new Error('Ошибка теста');
    const actualState = userOrderHistorySlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.rejected(errorTest, '')
    );

    expect(actualState).toEqual({
      orders: [],
      error: 'Ошибка теста',
      loading: false
    });
  });
});
