import {
  getFeedData,
  TFeedState,
  feedDataSlice,
  getOrderByNumber
} from './FeedDataSlice';


const initialState: TFeedState = {
  orders: [],
  orderModal: null,
  loading: false,
  total: 0,
  totalToday: 0,
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
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
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
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
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
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Тесты FeedDataSlice', () => {
  it('Тест на установку loading в true и сброс error при состоянии pending', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Ошибка теста'
      },
      getFeedData.pending('')
    );

    expect(actualState).toEqual({
      orders: [],
      orderModal: null,
      loading: true,
      total: 0,
      totalToday: 0,
      error: 'Ошибка теста'
    });
  });

  it('Tест на установку данных после успешной загрузки', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.fulfilled(ordersTest, '')
    );

    expect(actualState).toEqual({
      orders: ordersTest.orders,
      orderModal: null,
      loading: false,
      total: ordersTest.total,
      totalToday: ordersTest.totalToday,
      error: null
    });
  });

  it('Тест на установку error при отклонении загрузки данных', () => {
    const errorTest = new Error('Ошибка теста');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getFeedData.rejected(errorTest, '')
    );

    expect(actualState).toEqual({
      orders: [],
      orderModal: null,
      loading: false,
      total: 0,
      totalToday: 0,
      error: 'Ошибка теста'
    });
  });

  it('Тест на установку loading в true при запросе заказа по номеру', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        error: 'Ошибка теста'
      },
      getOrderByNumber.pending('1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      orderModal: null,
      loading: true,
      total: 0,
      totalToday: 0,
      error: 'Ошибка теста',
    });
  });

  it('Тест на установку заказав orderModal и завершение загрузки', () => {
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.fulfilled(ordersTest, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      orderModal: ordersTest.orders[0],
      loading: false,
      total: 0,
      totalToday: 0,
      error: null
    });
  });

  it('Тест на установку ошибки и завершение загрузки при отказе в получении заказа', () => {
    const errorTest = new Error('Ошибка теста');
    const actualState = feedDataSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getOrderByNumber.rejected(errorTest, '1', 1)
    );

    expect(actualState).toEqual({
      orders: [],
      orderModal: null,
      loading: false,
      total: 0,
      totalToday: 0,
      error: 'Ошибка теста'
    });
  });
});
